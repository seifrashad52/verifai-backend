import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth.js";

export const claimsRouter = Router();

// POST /api/claims/check — submit text or image for fact-check (M2)
claimsRouter.post("/check", requireAuth, (_req, res) => {
  res.status(501).json({ error: "Not implemented — see M2 milestone" });
});

// GET /api/claims/history — user's past checks
claimsRouter.get("/history", requireAuth, (_req, res) => {
  res.status(501).json({ error: "Not implemented — see M2 milestone" });
});
