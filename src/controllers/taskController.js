const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require("../services/taskService");

const getTasks = (req, res) => {
    const tasks = getAllTasks();

    res.json(tasks);
};

const getTask = (req, res) => {
    const id = Number(req.params.id);

    const task = getTaskById(id);

    if (!task) {
        return res.status(404).json({
            message: "Görev bulunamadı."
        });
    }

    res.json(task);
};

const addTask = (req, res) => {
    const { title, completed } = req.body;
    const task = createTask(title, completed);
    res.status(201).json(task);

};

const editTask = (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const task = updateTask(id, title, completed);

    if (!task) {
        return res.status(404).json({
            message: "Görev bulunamadı."
        });
    }

    res.json(task);
};

const removeTask = (req, res) => {
    const id = Number(req.params.id);

    const task = deleteTask(id);

    if (!task) {
        return res.status(404).json({
            message: "Görev bulunamadı."
        });
    }

    res.json({
        message: "Görev silindi.",
        task
    });
};

module.exports = {
    getTasks,
    getTask,
    addTask,
    editTask,
    removeTask,
    deleteTask
};