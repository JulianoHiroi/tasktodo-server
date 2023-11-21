import { Router } from "express";
import { login } from "../controllers/AuthControllers";

const authRouter = Router();

authRouter.get("/", login);

export default authRouter;
