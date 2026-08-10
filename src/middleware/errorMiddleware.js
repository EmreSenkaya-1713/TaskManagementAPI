const errorHandler = (err, req, res, next) => {
    console.error("Sunucu hatası:", err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || "Sunucuda beklenmeyen bir hata oluştu."
    });
};

module.exports = errorHandler;