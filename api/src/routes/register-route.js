import { Router } from "express";
import { resendEmail, signup } from "../controllers/register-controller.js";
import { confirmEmail } from "../controllers/confirm-controller.js";
import { auth, perfil } from "../../middleware/auth.js";

import multer from "multer";
import { editUser } from "../controllers/user-controller.js";
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", signup);
router.post("/resendConfirmation", resendEmail)
router.get("/confirm", confirmEmail); 
router.get("/", auth, perfil);
router.post("/editUser", upload.single("imagen"), editUser);

export default router;
