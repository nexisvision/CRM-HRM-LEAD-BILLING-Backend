import express from "express";
import { PORT } from "./config/config.js";
import routes from "./routes/index.js";
import sequelize from "./config/db.js";
import fileUpload from 'express-fileupload';
import responseHandler from "./utils/responseHandler.js";
import logAuditTrails from "./middlewares/logAuditTrails.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    try {
        return responseHandler.success(res, "Server is running successfully");
    } catch (error) {
        return responseHandler.error(res, error);
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

        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error.message);
    }
};

startServer();