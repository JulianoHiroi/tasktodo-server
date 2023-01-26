import { Router } from "express";

import TasksControllers from "../controllers/TasksControllers";

const tasksRouter = Router();
tasksRouter.get("/", TasksControllers.findAllTasks);
tasksRouter.get("/:id", TasksControllers.findTask);
tasksRouter.post("/create", TasksControllers.CreateTasks);
tasksRouter.patch("/update/:id", TasksControllers.UpdateTask);
tasksRouter.delete("/delete/:id", TasksControllers.DeleteTask);

export default tasksRouter;
