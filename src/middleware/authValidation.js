const { body } = require("express-validator");

const validateRegister = [
    body("name")
        .isString()
        .withMessage("Kullanıcı adı metin olmalıdır.")
        .trim()
        .notEmpty()
        .withMessage("Kullanıcı adı zorunludur.")
        .isLength({ min: 2, max: 100 })
        .withMessage("Kullanıcı adı 2 ile 100 karakter arasında olmalıdır."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("E-posta adresi zorunludur.")
        .isEmail()
        .withMessage("Geçerli bir e-posta adresi girilmelidir.")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("Şifre metin olmalıdır.")
        .isLength({ min: 6 })
        .withMessage("Şifre en az 6 karakter olmalıdır.")
];

const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("E-posta adresi zorunludur.")
        .isEmail()
        .withMessage("Geçerli bir e-posta adresi girilmelidir.")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("Şifre metin olmalıdır.")
        .notEmpty()
        .withMessage("Şifre zorunludur.")
];

module.exports = {
    validateRegister,
    validateLogin
};