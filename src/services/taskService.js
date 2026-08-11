const { sql, connectDatabase } = require("../config/database");

const getAllTasks = async () => {
    const pool = await connectDatabase();

    const result = await pool
        .request()
        .query(`
            SELECT
                Id,
                Title,
                Description,
                Completed,
                Priority,
                DueDate,
                UserId,
                CreatedAt,
                UpdatedAt
            FROM Tasks
            ORDER BY Id DESC
        `);

    return result.recordset;
};

const getTaskById = async (id) => {
    const pool = await connectDatabase();

    const result = await pool
        .request()
        .input("id", id)
        .query(`
            SELECT
                Id,
                Title,
                Description,
                Completed,
                Priority,
                DueDate,
                UserId,
                CreatedAt,
                UpdatedAt
            FROM Tasks
            WHERE Id = @id
        `);

    return result.recordset[0];
};

const createTask = async ({
    title,
    description,
    completed,
    priority,
    dueDate,
    userId
}) => {
    const pool = await connectDatabase();

    const result = await pool
        .request()
        .input("title", sql.NVarChar(200), title)
        .input("description", sql.NVarChar(500), description || null)
        .input("completed", sql.Bit, completed ?? false)
        .input("priority", sql.NVarChar(20), priority || "Medium")
        .input("dueDate", sql.DateTime2, dueDate || null)
        .input("userId", sql.Int, userId || null)
        .query(`
            INSERT INTO Tasks (
                Title,
                Description,
                Completed,
                Priority,
                DueDate,
                UserId
            )
            OUTPUT
                INSERTED.Id,
                INSERTED.Title,
                INSERTED.Description,
                INSERTED.Completed,
                INSERTED.Priority,
                INSERTED.DueDate,
                INSERTED.UserId,
                INSERTED.CreatedAt,
                INSERTED.UpdatedAt
            VALUES (
                @title,
                @description,
                @completed,
                @priority,
                @dueDate,
                @userId
            )
        `);

    return result.recordset[0];
};

const updateTask = async (
    id,
    userId,
    {
        title,
        description,
        completed,
        priority,
        dueDate
    }
) => {
    const pool = await connectDatabase();

    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("userId", sql.Int, userId)
        .input("title", sql.NVarChar(200), title)
        .input("description", sql.NVarChar(500), description ?? null)
        .input("completed", sql.Bit, completed ?? false)
        .input("priority", sql.NVarChar(20), priority || "Medium")
        .input("dueDate", sql.DateTime2, dueDate || null)
        .query(`
            UPDATE Tasks
            SET
                Title = @title,
                Description = @description,
                Completed = @completed,
                Priority = @priority,
                DueDate = @dueDate,
                UpdatedAt = GETDATE()
            OUTPUT
                INSERTED.Id,
                INSERTED.Title,
                INSERTED.Description,
                INSERTED.Completed,
                INSERTED.Priority,
                INSERTED.DueDate,
                INSERTED.UserId,
                INSERTED.CreatedAt,
                INSERTED.UpdatedAt
            WHERE Id = @id
              AND UserId = @userId
        `);

    return result.recordset[0];
};

const deleteTask = async (id) => {
    const pool = await connectDatabase();

    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query(`
            DELETE FROM Tasks
            OUTPUT
                DELETED.Id,
                DELETED.Title,
                DELETED.Description,
                DELETED.Completed,
                DELETED.Priority,
                DELETED.DueDate,
                DELETED.UserId,
                DELETED.CreatedAt,
                DELETED.UpdatedAt
            WHERE Id = @id
        `);

    return result.recordset[0];
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};