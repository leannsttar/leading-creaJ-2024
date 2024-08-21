import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import multer from "multer";
import compression from "compression";
import { PORT } from "./config.js";
import userRoutes from "./src/routes/register-route.js";
import loginRoutes from "./src/routes/login-route.js";
import projectRoutes from "./src/routes/project-route.js";
import tasksRoutes from "./src/routes/tasks-route.js";
import notificationsRoutes from "./src/routes/notifications-route.js"
import router from "./src/routes/newfile-route.js"
import http from "http";
import createSocketServer from "./socket.js";


const app = express();
const server = http.createServer(app);
const io = createSocketServer(server);

app.use(compression());
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/projectImages");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});

const upload = multer({ storage });

// app.use("/public",express.static('./public'));
app.use("/uploads", express.static("./uploads"));

/// app.use('/api/files', fileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", loginRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", tasksRoutes);
app.use('/api/files', router);

app.use("/api/notifications", notificationsRoutes)

server.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

