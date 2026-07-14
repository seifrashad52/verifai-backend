import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth.js";
import { requireAuth } from "../../middleware/requireAuth.js";

export const profileRouter = Router();

// GET /api/profile/me — current user info
profileRouter.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.session?.user });
});

// DELETE /api/profile/claims — delete user's claim history (privacy requirement)
profileRouter.delete("/claims", requireAuth, (_req, res) => {
  res.status(501).json({ error: "Not implemented — see M4 milestone" });
});

// GET /api/profile/session — convenience endpoint for mobile session check
profileRouter.get("/session", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json({ session });
});
