import express from "express";
import { getTasks, createTag, createTask } from "../controllers/tasks-controller.js";

import { auth } from "../../middleware/auth.js";
import multer from "multer";

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

router.get("/getTasks", upload.single(), getTasks)
router.post("/createTag", upload.single(), createTag);
router.post("/createTask", upload.single(), createTask);

export default router;