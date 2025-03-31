"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
class Comment extends sequelize_1.Model {
}
Comment.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    comment: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    user_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    task_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, {
    sequelize: connection_1.default,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
});
exports.default = Comment;
