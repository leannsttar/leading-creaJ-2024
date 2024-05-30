import express from 'express';
import { createProject, getAllProjects } from '../controllers/project-controller.js';
import { addTeamMember, createMeeting, createProject } from '../controllers/project-controller.js';
import { auth } from '../../middleware/auth.js';
import multer from 'multer'; 

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) 
  }
})

const upload = multer({ storage: storage })

router.post('/', auth, upload.single('imagen'), createProject);
router.get('/', getAllProjects);

router.post('/addMember', upload.single(), addTeamMember)
router.post('/createMeeting', upload.single(), createMeeting)

export default router;
