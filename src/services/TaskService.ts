import Task from "../database/models/Task";

export class TaskService {
  async create(data: { title: string; description?: string; status?: string; due_date?: Date; user_id: number; category_id?: number; priority_id?: number }) {
    try {
      return await Task.create(data);
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", error);
      throw new Error("Erro ao criar tarefa.");
    }
  }

  async getAll() {
    try {
      return await Task.findAll();
    } catch (error: any) {
      console.error("Erro ao obter tarefas:", error);
      throw new Error("Erro ao obter tarefas.");
    }
  }

  async getById(id: number) {
    try {
      return await Task.findByPk(id);
    } catch (error: any) {
      console.error("Erro ao buscar tarefa:", error);
      throw new Error("Erro ao buscar tarefa.");
    }
  }

  async update(id: number, data: Partial<{ title: string; description: string; status: string; due_date: Date }>) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error("Tarefa não encontrada");
      }
      return await task.update(data);
    } catch (error: any) {
      console.error("Erro ao atualizar tarefa:", error);
      throw new Error(error.message || "Erro ao atualizar tarefa.");
    }
  }

  async delete(id: number) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error("Tarefa não encontrada");
      }

      return await Task.destroy({ where: { id } });
    } catch (error: any) {
      console.error("Erro ao deletar tarefa:", error);
      throw new Error(error.message || "Erro ao deletar tarefa.");
    }
  }
}

