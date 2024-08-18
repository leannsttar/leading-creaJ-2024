import express from "express";
import { getProjectNotifications, getUserNotifications } from "../controllers/notifications-controller.js";

const router = express.Router()

router.get('/getUserNotifications/:userId', getUserNotifications)
router.get('/getProjectNotifications/:projectId', getProjectNotifications)

export default router;