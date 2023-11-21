import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import UsersControllers from "../controllers/UsersControllers";

const usersRouter = Router();

usersRouter.get("/", authMiddleware, UsersControllers.getAllUsers);
usersRouter.post("/post", UsersControllers.CreateUser);

export default usersRouter;
