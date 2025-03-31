"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
class Task extends sequelize_1.Model {
}
Task.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM("pending", "in-progress", "completed"), defaultValue: "pending" },
    due_date: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    user_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    category_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    priority_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
}, {
    sequelize: connection_1.default,
    modelName: "Task",
    tableName: "tasks",
    timestamps: false,
});
exports.default = Task;
