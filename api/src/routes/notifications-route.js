import express from "express";
import { getUserNotifications } from "../controllers/notifications-controller.js";

const router = express.Router()

router.get('/getUserNotifications/:userId', getUserNotifications)

export default router;