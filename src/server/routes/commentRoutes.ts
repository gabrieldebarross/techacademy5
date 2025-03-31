import { Router } from "express";
import { CommentController } from "../../controllers/CommentController";
import { authMiddleware } from "../../middleware/authMiddleware";

const routerComment = Router();
const commentController = new CommentController();

routerComment.post("/comments", authMiddleware, commentController.create);
routerComment.get("/comments", authMiddleware, commentController.getAll);
routerComment.get("/comments/:id", authMiddleware, commentController.getById);
routerComment.put("/comments/:id", authMiddleware, commentController.update);
routerComment.delete("/comments/:id", authMiddleware, commentController.delete);

export default routerComment;
 