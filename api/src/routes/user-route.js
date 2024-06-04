import express from "express";
import { auth } from "../../middleware/auth.js";
import multer from "multer";
import { editUser } from "../controllers/user-controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/editUser', upload.single('imagen'), editUser)

export default router;