const tasks = [
    {
        id: 1,
        title: "Node.js çalış",
        completed: false
    },
    {
        id: 2,
        title: "Express öğren",
        completed: true
    }
];

const getAllTasks = () => {
    return tasks;
};

const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
};

const createTask = (title, completed) => {

    const newTask = {
    id: tasks.length + 1,
    title,
    completed
};
tasks.push(newTask);
return newTask;

};

const updateTask = (id, title, completed) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return null;
    }

    task.title = title;
    task.completed = completed;

    return task;
};

const deleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        return null;
    }

    const deletedTask = tasks[index];

    tasks.splice(index, 1);

    return deletedTask;
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};