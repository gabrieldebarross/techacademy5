import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class Comment extends Model {}

Comment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    comment: { type: DataTypes.TEXT, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    task_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
  }
);

export default Comment;
