import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import listsRouter from "./lists.routes";
import tasksRouter from "./tasks.routes";

const prisma = new PrismaClient();

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "Welcome to API with Prisma 2 and Express" });
});

router.use("/list", listsRouter);
router.use("/task", tasksRouter);

export { router };
