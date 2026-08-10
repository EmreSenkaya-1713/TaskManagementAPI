const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

const {
    validateRegister,
    validateLogin
} = require("../middleware/authValidation");

const validateRequest = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
    "/register",
    validateRegister,
    validateRequest,
    register
);

router.post(
    "/login",
    validateLogin,
    validateRequest,
    login
);

module.exports = router;