import { Router } from "express";
import { parseResume } from "../controllers/resume.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/uploadresume").post(upload.single('file'),parseResume);

export default router;