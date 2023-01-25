import { Router } from "express";
import ListsControllers from "../controllers/ListsControllers";

const listsRouter = Router();

listsRouter.get("/", ListsControllers.findAllLists);
listsRouter.post("/create", ListsControllers.createList);
listsRouter.patch("/update/:id", ListsControllers.updateList);
listsRouter.delete("/delete/:id", ListsControllers.deleteList);
export default listsRouter;
