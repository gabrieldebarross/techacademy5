import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json(category);
    } catch (error: any) {
      console.error("Erro ao criar categoria:", error);
      res.status(500).json({ error: "Erro ao criar categoria", message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAll();
      res.json(categories);
    } catch (error: any) {
      console.error("Erro ao obter categorias:", error);
      res.status(500).json({ error: "Erro ao obter categorias", message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const category = await categoryService.getById(Number(req.params.id));
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: "Categoria não encontrada" });
      }
    } catch (error: any) {
      console.error("Erro ao buscar categoria:", error);
      res.status(500).json({ error: "Erro ao buscar categoria", message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedCategory = await categoryService.update(Number(req.params.id), req.body);
      if (updatedCategory) {
        res.json(updatedCategory);
      } else {
        res.status(404).json({ message: "Categoria não encontrada" });
      }
    } catch (error: any) {
      console.error("Erro ao atualizar categoria:", error);
      res.status(500).json({ error: "Erro ao atualizar categoria", message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await categoryService.delete(Number(req.params.id));
      if (result) {
        res.json({ message: "Categoria removida" });
      } else {
        res.status(404).json({ message: "Categoria não encontrada" });
      }
    } catch (error: any) {
      console.error("Erro ao remover categoria:", error);
      res.status(500).json({ error: "Erro ao remover categoria", message: error.message });
    }
  }
}
