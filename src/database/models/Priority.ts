import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class Priority extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public user_id!: number;
  public created_at!: Date;
}

Priority.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    modelName: "Priority",
    tableName: "priorities",
    timestamps: false,
  }
);

export default Priority;
