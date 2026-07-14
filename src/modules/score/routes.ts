import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth.js";

export const scoreRouter = Router();

// GET /api/score — total score, streak, badges (M4)
scoreRouter.get("/", requireAuth, (_req, res) => {
  res.status(501).json({ error: "Not implemented — see M4 milestone" });
});
