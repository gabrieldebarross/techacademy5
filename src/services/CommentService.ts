import Comment from "../database/models/Comment";

export class CommentService {
  async create(data: { comment: string; user_id: number; task_id: number }) {
    return await Comment.create(data);
  }

  async getAll() {
    return await Comment.findAll();
  }

  async getById(id: number) {
    return await Comment.findByPk(id);
  }

  async update(id: number, data: Partial<{ comment: string }>) {
    const comment = await Comment.findByPk(id);
    if (!comment) return null;
    return await comment.update(data);
  }

  async delete(id: number) {
    return await Comment.destroy({ where: { id } });
  }
}
