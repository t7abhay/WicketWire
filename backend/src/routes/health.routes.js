import express from "express";
import { healthController } from "../controllers/health.controller.js";
const rotuer = experss.Router();

router.get("/health", healthController);

export default router;
