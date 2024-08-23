import { Router } from "express";
import multer from "multer";
import {uploadFile, getFilesByTask, downloadFile} from "../controllers/update-controller.js"
import {auth} from "../../middleware/auth.js"
const router = Router()
const update = multer()
router.use(auth)

router.post('/upload', update.single("file"), uploadFile)
router.get("/uploadfiles", getFilesByTask)
router.post("/uploadfiles", downloadFile)

export default router
