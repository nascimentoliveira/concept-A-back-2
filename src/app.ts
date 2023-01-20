import express, { Express } from "express";
import cors from "cors";
import { projectsRouter } from "./routes/projects-router.js";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("OK!"))
  .use("/projects", projectsRouter);

export function init(): Promise<Express> {
  return Promise.resolve(app);
}

export default app;