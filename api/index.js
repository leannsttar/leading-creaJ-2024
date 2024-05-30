import express from "express";
import cors from "cors";
import multer from 'multer';
import userRoutes from "./src/routes/register-route.js";
import loginRoutes from "./src/routes/login-route.js";  
import projectRoutes from "./src/routes/project-route.js";
import { auth } from "./middleware/auth.js";
import { getAllProjects } from "./src/controllers/project-controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/projectImages');
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('src/uploads'));

app.use("/api/users", userRoutes);
app.use("/api/auth", loginRoutes);  

app.use("/api/projects", projectRoutes);

app.listen(5000, () => {
  console.log(`Servidor funcionando en el puerto ${5000}`);
});
