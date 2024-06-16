import express from "express";
import {
  createProject,
  getAllProjects,
  getProject,
  getProjectConfig,
  getProjectOverview,
  updateProject,
  addTeamMember,
  createMeeting,
  getProjectBoard,
  getMeetings,
} from "../controllers/project-controller.js";

import { createTag, createTask } from "../controllers/tasks-controller.js";
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

router.post("/", auth, upload.single("imagen"), createProject);
router.get("/meetings", getMeetings);
router.get("/:usuarioId", getAllProjects);

router.post("/addMember", upload.single(), addTeamMember);
router.post("/createMeeting", upload.none(), createMeeting);

router.get("/getProject/:id", getProject);
router.get("/getProjectOverview/:id", getProjectOverview);
router.get("/getProjectConfig/:id", getProjectConfig);
router.get("/getProjectBoard/:id", getProjectBoard);

router.post("/updateProject/", upload.single("imagen"), updateProject);

router.post("/createTag", upload.single(), createTag);

router.post("/createTask", upload.single(), createTask);

export default router;
