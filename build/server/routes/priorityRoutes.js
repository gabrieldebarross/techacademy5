"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PriorityController_1 = require("../../controllers/PriorityController");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const routerPriority = express_1.default.Router();
const priorityController = new PriorityController_1.PriorityController();
routerPriority.post("/prioritys", authMiddleware_1.authMiddleware, priorityController.create);
routerPriority.get("/prioritys", authMiddleware_1.authMiddleware, priorityController.getAll);
routerPriority.get("/prioritys/:id", authMiddleware_1.authMiddleware, priorityController.getById);
routerPriority.put("/prioritys/:id", authMiddleware_1.authMiddleware, priorityController.update);
routerPriority.delete("/prioritys/:id", authMiddleware_1.authMiddleware, priorityController.delete);
exports.default = routerPriority;
