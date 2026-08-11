require("dotenv").config();

const express = require("express");
const cors = require("cors");

const taskRoutes = require("./src/routes/taskRoutes");
const authRoutes = require("./src/routes/authRoutes");
const { connectDatabase } = require("./src/config/database");
const errorHandler = require("./src/middleware/errorMiddleware");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("CORS tarafından engellendi."));
    },
    credentials: true
}));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

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