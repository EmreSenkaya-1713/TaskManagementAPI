require("dotenv").config();

const express = require("express");
const taskRoutes = require("./src/routes/taskRoutes");
const authRoutes = require("./src/routes/authRoutes");
const { connectDatabase } = require("./src/config/database");

const app = express();

app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(` Server ${PORT} portunda çalışıyor.`);
        });
    } catch (error) {
        console.error(" Sunucu başlatılamadı.");
        process.exit(1);
    }
};

startServer();