import { Request, Response } from "express";
import { PriorityService } from "../services/PriorityService";

const priorityService = new PriorityService();

export class PriorityController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, user_id } = req.body;
      
      if (!name || !user_id) {
        res.status(400).json({ error: "Campos obrigatórios faltando" });
        return; 
      }

      const priority = await priorityService.create({
        name,
        description,
        user_id,
      });

      res.status(201).json(priority);
    } catch (error: any) {
      console.error("Erro ao criar prioridade:", error);
      res.status(500).json({ error: error.message || "Erro ao criar prioridade" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const priorities = await priorityService.getAll();
      res.json(priorities);
    } catch (err: any) {
      console.error("Erro ao recuperar prioridades:", err);
      res.status(500).json({ error: err.message || "Erro ao recuperar prioridades." });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const priority = await priorityService.getById(Number(req.params.id));
      if (priority) {
        res.json(priority);
      } else {
        res.status(404).json({ message: "Prioridade não encontrada" });
      }
    } catch (err: any) {
      console.error("Erro ao recuperar prioridade:", err);
      res.status(500).json({ error: err.message || "Erro ao recuperar prioridade." });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedPriority = await priorityService.update(Number(req.params.id), req.body);
      if (updatedPriority) {
        res.json(updatedPriority);
      } else {
        res.status(404).json({ message: "Prioridade não encontrada" });
      }
    } catch (err: any) {
      console.error("Erro ao atualizar prioridade:", err);
      res.status(500).json({ error: err.message || "Erro ao atualizar prioridade." });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await priorityService.delete(Number(req.params.id));
      if (result === 0) {
        res.status(404).json({ message: "Prioridade não encontrada" });
      } else {
        res.json({ message: "Prioridade removida" });
      }
    } catch (err: any) {
      console.error("Erro ao deletar prioridade:", err);
      res.status(500).json({ error: err.message || "Erro ao deletar prioridade." });
    }
  }
}
