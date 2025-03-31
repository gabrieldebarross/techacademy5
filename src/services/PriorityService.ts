import Priority from "../database/models/Priority";

export class PriorityService {
  async create(data: { name: string; description?: string; user_id: number }) {
    try {
      return await Priority.create(data);
    } catch (error: any) {
      console.error("Erro ao criar prioridade:", error);
      throw new Error("Erro ao criar prioridade.");
    }
  }

  async getAll() {
    try {
      return await Priority.findAll();
    } catch (error: any) {
      console.error("Erro ao obter prioridades:", error);
      throw new Error("Erro ao obter prioridades.");
    }
  }

  async getById(id: number) {
    try {
      return await Priority.findByPk(id);
    } catch (error: any) {
      console.error("Erro ao buscar prioridade:", error);
      throw new Error("Erro ao buscar prioridade.");
    }
  }

  async update(id: number, data: Partial<{ name: string; description: string }>) {
    try {
      const priority = await Priority.findByPk(id);
      if (!priority) {
        throw new Error("Prioridade não encontrada");
      }
      return await priority.update(data);
    } catch (error: any) {
      console.error("Erro ao atualizar prioridade:", error);
      throw new Error(error.message || "Erro ao atualizar prioridade.");
    }
  }

  async delete(id: number) {
    try {
      const priority = await Priority.findByPk(id);
      if (!priority) {
        throw new Error("Prioridade não encontrada");
      }
      return await Priority.destroy({ where: { id } });
    } catch (error: any) {
      console.error("Erro ao deletar prioridade:", error);
      throw new Error(error.message || "Erro ao deletar prioridade.");
    }
  }
}
