import { Request, Response } from "express";
import { CommentService } from "../services/CommentService";

const commentService = new CommentService();

export class CommentController {
  async create(req: Request, res: Response) {
    try {
      const comment = await commentService.create(req.body);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar comentário" });
    }
  }

  async getAll(req: Request, res: Response) {
    res.json(await commentService.getAll());
  }

  async getById(req: Request, res: Response) {
    const comment = await commentService.getById(Number(req.params.id));
    comment ? res.json(comment) : res.status(404).json({ message: "Comentário não encontrado" });
  }

  async update(req: Request, res: Response) {
    const updatedComment = await commentService.update(Number(req.params.id), req.body);
    updatedComment ? res.json(updatedComment) : res.status(404).json({ message: "Comentário não encontrado" });
  }

  async delete(req: Request, res: Response) {
    await commentService.delete(Number(req.params.id));
    res.json({ message: "Comentário removido" });
  }
}
