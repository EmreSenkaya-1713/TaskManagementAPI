const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require("../services/taskService");

const getTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await getAllTasks(userId);

        res.json(tasks);
    } catch (error) {
        console.error("Görevler getirilirken hata oluştu:", error);

        res.status(500).json({
            message: "Görevler getirilirken bir hata oluştu."
        });
    }
};

const getTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user.userId;


        const task = await getTaskById(id, userId);

        if (!task) {
            return res.status(404).json({
                message: "Görev bulunamadı."
            });
        }

        res.json(task);
    } catch (error) {
        console.error("Görev getirilirken hata oluştu:", error);

        res.status(500).json({
            message: "Görev getirilirken bir hata oluştu."
        });
    }
};

const addTask = async (req, res) => {
    try {
        const userId = req.user.userId;

        const {
            title,
            description,
            completed,
            priority,
            dueDate
        } = req.body;


        const task = await createTask({
            title: title.trim(),
            description,
            completed,
            priority,
            dueDate,
            userId
        });

        res.status(201).json(task);
    } catch (error) {
        console.error("Görev oluşturulurken hata oluştu:", error);

        res.status(500).json({
            message: "Görev oluşturulurken bir hata oluştu."
        });
    }
};

const editTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user.userId;

        const {
            title,
            description,
            completed,
            priority,
            dueDate
        } = req.body;

        const task = await updateTask(id, userId, {
            title: title?.trim(),
            description: description ?? null,
            completed: completed ?? false,
            priority: priority || "Medium",
            dueDate: dueDate || null
        });

        if (!task) {
            return res.status(404).json({
                message: "Güncellenecek görev bulunamadı."
            });
        }

        res.json(task);
    } catch (error) {
        console.error("Görev güncellenirken hata oluştu:", error);

        res.status(500).json({
            message: "Görev güncellenirken bir hata oluştu."
        });
    }
};

const removeTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user.userId;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Geçerli bir görev ID'si gönderilmelidir."
            });
        }

        const deletedTask = await deleteTask(id, userId);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Silinecek görev bulunamadı."
            });
        }

        res.json({
            message: "Görev başarıyla silindi.",
            task: deletedTask
        });
    } catch (error) {
        console.error("Görev silinirken hata oluştu:", error);

        res.status(500).json({
            message: "Görev silinirken bir hata oluştu."
        });
    }
};

module.exports = {
    getTasks,
    getTask,
    addTask,
    editTask,
    removeTask
};