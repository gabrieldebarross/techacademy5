"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
class Priority extends sequelize_1.Model {
}
Priority.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    user_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW }
}, {
    sequelize: connection_1.default,
    modelName: "Priority",
    tableName: "priorities",
    timestamps: false,
});
exports.default = Priority;
