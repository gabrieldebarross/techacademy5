import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

const taskService = new TaskService();

export class TaskController {
   async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, status, due_date, user_id, category_id, priority_id } = req.body;
      
      if (!title || !description || !status || !user_id) {
        res.status(400).json({ error: "Campos obrigatórios faltando" });
        return; 
      }

      const task = await taskService.create({
        title,
        description,
        status,
        due_date,
        user_id,
        category_id,
        priority_id,
      });

      res.status(201).json(task);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      res.status(500).json({ error: "Erro ao criar tarefa" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tasks = await taskService.getAll();
      res.json(tasks);
    } catch (err) {
      console.error("Erro ao recuperar tarefas:", err);
      res.status(500).json({ error: "Erro ao recuperar tarefas." });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const task = await taskService.getById(Number(req.params.id));
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: "Tarefa não encontrada" });
      }
    } catch (err) {
      console.error("Erro ao recuperar tarefa:", err);
      res.status(500).json({ error: "Erro ao recuperar tarefa." });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedTask = await taskService.update(Number(req.params.id), req.body);

      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ message: "Tarefa não encontrada" });
      }
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      res.status(500).json({ error: "Erro ao atualizar tarefa." });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await taskService.delete(Number(req.params.id));
      res.json({ message: "Tarefa removida" });
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
      res.status(500).json({ error: "Erro ao deletar tarefa." });
    }
  }
}
