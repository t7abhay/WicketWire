import express from "express";
import {
  matchesInfo,
  liveMatchDetails,
} from "../controllers/match.controller.js";

const router = express.Router();
router.get("/match-info", matchesInfo);
router.get("/match-info/live", liveMatchDetails);

export default router;
