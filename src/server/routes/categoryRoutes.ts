import { Router } from "express";
import { CategoryController } from "../../controllers/CategoryController";

import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();
const categoryController = new CategoryController();

router.post("/categories/", authMiddleware, categoryController.create);
router.get("/categories/", authMiddleware, categoryController.getAll);
router.get("/categories/:id", authMiddleware, categoryController.getById);
router.put("/categories/:id", authMiddleware, categoryController.update);
router.delete("/categories/:id", authMiddleware, categoryController.delete);

export default router;
