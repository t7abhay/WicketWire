import express from "express";
import { matchesInfo, liveMatchInfo } from "../controllers/match.controller.js";
const router = express.Router();

router.get("/match-info", matchesInfo);
router.get("/match-info/live", liveMatchInfo);

export default router;
