import cors from "cors";
import express from "express";
import { createServer } from "http";
import { PORT } from "./config/config.js";
import routes from "./routes/index.js";
import sequelize from "./config/db.js";
import fileUpload from 'express-fileupload';
import initializeSocket from "./socket/index.js";
import responseHandler from "./utils/responseHandler.js";
import logAuditTrails from "./middlewares/logAuditTrails.js";

const app = express();

const server = createServer(app);

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    try {
        return responseHandler.success(res, "Server is running successfully");
    } catch (error) {
        return responseHandler.error(res, error?.message);
    }
});
app.use(logAuditTrails);

app.use("/api/v1/", routes);


app.use(fileUpload());

app.get("*", (req, res) => {
    return responseHandler.error(res, "Route not found");
});

const startServer = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('✅ Database synced successfully');

        const io = initializeSocket(server);
        console.log('✅ Socket.IO initialized');

        server.listen(PORT, () => {
            console.log(`✅ Server and Socket.IO running on port ${PORT}`);
        });

        app.set('io', io);

    } catch (error) {
        console.error('❌ Error starting server:', error.message);
    }
};

startServer();