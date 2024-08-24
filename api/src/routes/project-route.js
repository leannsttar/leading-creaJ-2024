import express from 'express';
import { createProject, getAllProjects, getProject, getProjectConfig, getProjectInvitations, getProjectOverview, updateProject } from '../controllers/project-controller.js';
import { createMeeting, getProjectBoard, getMeetings, confirmAttendance } from '../controllers/project-controller.js';
import { acceptInvitation, addTeamMember } from '../controllers/addMembers-controller.js';
import { auth } from '../../middleware/auth.js';
import multer from 'multer'; 
import { createTask, createTag } from '../controllers/tasks-controller.js';
const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

router.post('/', auth, createProject);
router.get('/meetings/:id', getMeetings); 
router.post('/meetings/attendance', confirmAttendance);
router.get('/:usuarioId', getAllProjects);

router.post("/addMember", upload.single(), addTeamMember);
router.get('/acceptInvitation/:id', acceptInvitation)

router.post("/createMeeting", upload.none(), createMeeting);

router.get('/getProjectInvitations/:projectId', getProjectInvitations);
router.get("/getProject/:id", getProject);
router.get("/getProjectOverview/:id", getProjectOverview);
router.get("/getProjectConfig/:id", getProjectConfig);
router.get("/getProjectBoard/:id", getProjectBoard);

router.post("/updateProject/", upload.single("imagen"), updateProject);

router.post("/createTag", upload.single(), createTag);

router.post("/createTask", upload.single(), createTask);

export default router;