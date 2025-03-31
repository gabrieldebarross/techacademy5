import Category from "../database/models/Category";

export class CategoryService {
    async create(data: { name: string, description: string, user_id: number }) {
        return await Category.create(data);
    }

  async getAll() {
    return await Category.findAll();
  }

  async getById(id: number) {
    return await Category.findByPk(id);
  }

  async update(id: number, data: Partial<{ name: string; description: string }>) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(data);
  }

  async delete(id: number) {
    return await Category.destroy({ where: { id } });
  }
}