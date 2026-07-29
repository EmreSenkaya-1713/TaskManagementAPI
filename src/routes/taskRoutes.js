const express = require("express");

const {
    getTasks,
    getTask,
    addTask,
    editTask,
    removeTask
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", addTask);
router.put("/:id", editTask);
router.delete("/:id", removeTask);

module.exports = router;