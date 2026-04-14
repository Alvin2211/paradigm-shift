import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Router } from "express"; 
import { getRoadmap } from "../controllers/roadmap.controller.js";
import {roadmaplimiter} from "../middlewares/rateLimiter.js";

const router = Router();
router.route("/roadmap").get(ClerkExpressRequireAuth(),roadmaplimiter,getRoadmap);

export default router;