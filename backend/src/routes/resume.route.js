import { Router } from "express";
import { parseResume } from "../controllers/resume.controller.js";
import { genresume } from "../controllers/generate.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";


const router = Router();

router.route("/uploadresume").post(ClerkExpressRequireAuth(),upload.single('file'),parseResume);
router.route("/generateresume").post(ClerkExpressRequireAuth(),genresume);
export default router;