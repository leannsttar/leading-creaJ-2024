import { Router } from "express";
import multer from "multer";
import {uploadFile} from "../controllers/update-controller.js"
const router = Router()
const update = multer()

router.post('/upload', update.single("file"), uploadFile)

export default router
