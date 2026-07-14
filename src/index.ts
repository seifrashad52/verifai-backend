import "dotenv/config";
import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { auth } from "./lib/auth.js";
import { apiRouter } from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN.split(","),
    credentials: true,
  }),
);

// Mount better-auth BEFORE express.json() — order matters
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "verifai-backend" });
});

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`verifAI backend listening on http://localhost:${env.PORT}`);
});
