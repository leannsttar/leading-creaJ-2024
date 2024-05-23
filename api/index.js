import express from "express";
import userRoutes from "./src/routes/register-route.js";
import loginRoutes from "./src/routes/login-route.js";  
import projectRoutes from "./src/routes/project-route.js"
import cors from "cors";
import { auth } from "./middleware/auth.js";

import multer from 'multer'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/projectImages')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }
})

const upload = multer({ storage })

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('src/uploads'));


// la ruta de los usuarios en cuestión (solo el registro)
app.use("/api/users", userRoutes);

//ruta del login
app.use("/api/auth", loginRoutes);  

app.use("/project", upload.single('projectImage'), projectRoutes)


app.listen(5000, () => {
  console.log(`Servidor funcionando en el puerto ${5000}`);
});

