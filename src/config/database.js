const sql = require("mssql");

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,

    options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate:
            process.env.DB_TRUST_SERVER_CERTIFICATE === "true"
    }
};

const connectDatabase = async () => {
    try {
        const pool = await sql.connect(dbConfig);

        console.log("✅ MSSQL bağlantısı başarılı.");

        return pool;
    } catch (error) {
        console.error("❌ Veritabanı bağlantı hatası:");
        console.error(error);

        throw error;
    }
};

module.exports = {
    sql,
    connectDatabase
};