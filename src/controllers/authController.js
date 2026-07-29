const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    findUserByEmail,
    createUser
} = require("../services/authService");

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Kullanıcı adı zorunludur."
            });
        }

        if (typeof email !== "string" || !email.trim()) {
            return res.status(400).json({
                message: "E-posta adresi zorunludur."
            });
        }

        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({
                message: "Şifre en az 6 karakter olmalıdır."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await findUserByEmail(normalizedEmail);

        if (existingUser) {
            return res.status(409).json({
                message: "Bu e-posta adresi zaten kullanılıyor."
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await createUser({
            name: name.trim(),
            email: normalizedEmail,
            passwordHash
        });

        res.status(201).json({
            message: "Kullanıcı başarıyla oluşturuldu.",
            user
        });
    } catch (error) {
        console.error("Kullanıcı oluşturulurken hata oluştu:", error);

        res.status(500).json({
            message: "Kullanıcı oluşturulurken bir hata oluştu."
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (typeof email !== "string" || !email.trim()) {
            return res.status(400).json({
                message: "E-posta adresi zorunludur."
            });
        }

        if (typeof password !== "string" || !password) {
            return res.status(400).json({
                message: "Şifre zorunludur."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await findUserByEmail(normalizedEmail);

        if (!user) {
            return res.status(401).json({
                message: "E-posta veya şifre hatalı."
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.PasswordHash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "E-posta veya şifre hatalı."
            });
        }

        const token = jwt.sign(
            {
                userId: user.Id,
                email: user.Email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Giriş başarılı.",
            token,
            user: {
                id: user.Id,
                name: user.Name,
                email: user.Email
            }
        });
    } catch (error) {
        console.error("Giriş yapılırken hata oluştu:", error);

        res.status(500).json({
            message: "Giriş yapılırken bir hata oluştu."
        });
    }
};

module.exports = {
    register,
    login
};