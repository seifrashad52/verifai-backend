import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth.js";

export const gameRouter = Router();

// GET /api/game/countries — list active countries with level counts (M3)
gameRouter.get("/countries", requireAuth, (_req, res) => {
  res.status(501).json({ error: "Not implemented — see M3 milestone" });
});

// GET /api/game/countries/:countryId/levels
gameRouter.get("/countries/:countryId/levels", requireAuth, (_req, res) => {
  res.status(501).json({ error: "Not implemented — see M3 milestone" });
});

// POST /api/game/levels/:levelId/answer
gameRouter.post("/levels/:levelId/answer", requireAuth, (_req, res) => {
  res.status(501).json({ error: "Not implemented — see M3 milestone" });
});

// GET /api/game/levels/:levelId/reveal — verdict + source trace timeline
gameRouter.get("/levels/:levelId/reveal", requireAuth, (_req, res) => {
  res.status(501).json({ error: "Not implemented — see M3 milestone" });
});
