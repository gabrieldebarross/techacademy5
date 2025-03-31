import { Router } from "express";
import { TaskController } from "../../controllers/TaskController";
import { authMiddleware } from "../../middleware/authMiddleware";

const routerTask = Router();
const taskController = new TaskController();

routerTask.post("/tasks/", authMiddleware, taskController.create);
routerTask.get("/tasks/", authMiddleware, taskController.getAll);
routerTask.get("/tasks/:id", authMiddleware, taskController.getById);
routerTask.put("/tasks/:id", authMiddleware, taskController.update);
routerTask.delete("/tasks/:id", authMiddleware, taskController.delete);

export default routerTask;
