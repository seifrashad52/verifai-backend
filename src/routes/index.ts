import { Router } from "express";
import { claimsRouter } from "../modules/claims/routes.js";
import { gameRouter } from "../modules/game/routes.js";
import { scoreRouter } from "../modules/score/routes.js";
import { profileRouter } from "../modules/profile/routes.js";

export const apiRouter = Router();

apiRouter.use("/claims", claimsRouter);
apiRouter.use("/game", gameRouter);
apiRouter.use("/score", scoreRouter);
apiRouter.use("/profile", profileRouter);
