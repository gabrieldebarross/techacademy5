import express from "express";
import { PriorityController } from "../../controllers/PriorityController";
import { authMiddleware } from "../../middleware/authMiddleware";

const routerPriority = express.Router();
const priorityController = new PriorityController();

routerPriority.post("/prioritys", authMiddleware, priorityController.create);
routerPriority.get("/prioritys", authMiddleware, priorityController.getAll);
routerPriority.get("/prioritys/:id", authMiddleware, priorityController.getById);
routerPriority.put("/prioritys/:id", authMiddleware, priorityController.update);
routerPriority.delete("/prioritys/:id", authMiddleware, priorityController.delete);

export default routerPriority;
