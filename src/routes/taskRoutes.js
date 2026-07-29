const express = require("express");

const authenticate =
    require("../middleware/authMiddleware");

const {
    getTasks,
    getTask,
    addTask,
    editTask,
    removeTask
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", authenticate, getTasks);

router.get("/:id", authenticate, getTask);

router.post("/", authenticate, addTask);

router.put("/:id", authenticate, editTask);

router.delete("/:id", authenticate, removeTask);

module.exports = router;