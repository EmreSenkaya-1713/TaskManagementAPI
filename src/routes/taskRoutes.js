const express = require("express");

const {
    getTasks,
    getTask,
    addTask,
    editTask,
    removeTask
} = require("../controllers/taskController");

const authenticate = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validationMiddleware");

const {
    validateTaskId,
    validateCreateTask,
    validateUpdateTask
} = require("../middleware/taskValidation");

const router = express.Router();

router.get(
    "/",
    authenticate,
    getTasks
);

router.get(
    "/:id",
    authenticate,
    validateTaskId,
    validateRequest,
    getTask
);

router.post(
    "/",
    authenticate,
    validateCreateTask,
    validateRequest,
    addTask
);

router.put(
    "/:id",
    authenticate,
    validateUpdateTask,
    validateRequest,
    editTask
);

router.delete(
    "/:id",
    authenticate,
    validateTaskId,
    validateRequest,
    removeTask
);

module.exports = router;