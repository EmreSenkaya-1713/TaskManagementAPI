const { body, param } = require("express-validator");

const validateTaskId = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Geçerli bir görev ID'si gönderilmelidir.")
];

const validateCreateTask = [
    body("title")
        .isString()
        .withMessage("Görev başlığı metin olmalıdır.")
        .trim()
        .notEmpty()
        .withMessage("Görev başlığı zorunludur.")
        .isLength({ max: 200 })
        .withMessage("Görev başlığı en fazla 200 karakter olabilir."),

    body("description")
        .optional({ nullable: true })
        .isString()
        .withMessage("Açıklama metin olmalıdır.")
        .isLength({ max: 500 })
        .withMessage("Açıklama en fazla 500 karakter olabilir."),

    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed değeri true veya false olmalıdır."),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Priority Low, Medium veya High olmalıdır."),

    body("dueDate")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("Geçerli bir tarih gönderilmelidir.")
];

const validateUpdateTask = [
    ...validateTaskId,
    ...validateCreateTask
];

module.exports = {
    validateTaskId,
    validateCreateTask,
    validateUpdateTask
};