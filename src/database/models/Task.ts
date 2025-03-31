import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class Task extends Model {}

Task.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM("pending", "in-progress", "completed"), defaultValue: "pending" },
    due_date: { type: DataTypes.DATE, allowNull: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: true },
    priority_id: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: false,
  }
);

export default Task;
