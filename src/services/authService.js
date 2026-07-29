const { sql, connectDatabase } = require("../config/database");

const findUserByEmail = async (email) => {
    const pool = await connectDatabase();

    const result = await pool
        .request()
        .input("email", sql.NVarChar(255), email)
        .query(`
            SELECT
                Id,
                Name,
                Email,
                PasswordHash,
                CreatedAt
            FROM Users
            WHERE Email = @email
        `);

    return result.recordset[0];
};

const createUser = async ({
    name,
    email,
    passwordHash
}) => {
    const pool = await connectDatabase();

    const result = await pool
        .request()
        .input("name", sql.NVarChar(100), name)
        .input("email", sql.NVarChar(255), email)
        .input("passwordHash", sql.NVarChar(255), passwordHash)
        .query(`
            INSERT INTO Users (
                Name,
                Email,
                PasswordHash
            )
            OUTPUT
                INSERTED.Id,
                INSERTED.Name,
                INSERTED.Email,
                INSERTED.CreatedAt
            VALUES (
                @name,
                @email,
                @passwordHash
            )
        `);

    return result.recordset[0];
};

module.exports = {
    findUserByEmail,
    createUser
};