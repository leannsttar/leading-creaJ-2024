import express from "express";
import { getTasks, createTag, createTask, updateSubtaskStatus, addLinkToTask, createComment, getUserTasks, changeTaskStatus, updateTask, getUserTasksCalendar, getFilesByProject } from "../controllers/tasks-controller.js";

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

router.get("/getUserTasks/:userId", upload.single(), getUserTasks)
router.get("/getUserTasksCalendar/:userId", upload.single(), getUserTasksCalendar)
router.get('/files/project/:projectId', getFilesByProject);
router.post("/createTag", createTag);
router.post("/createTask", createTask);
router.post("/updateTask", updateTask)
router.put("/updateSubtask", updateSubtaskStatus)
router.post("/createLink", addLinkToTask)
router.post("/createComment", createComment)
router.post("/changeTaskStatus", changeTaskStatus)

export default router;