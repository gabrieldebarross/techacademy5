"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const TaskService_1 = require("../services/TaskService");
const taskService = new TaskService_1.TaskService();
class TaskController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, status, due_date, user_id, category_id, priority_id } = req.body;
                if (!title || !description || !status || !user_id) {
                    res.status(400).json({ error: "Campos obrigatórios faltando" });
                    return;
                }
                const task = yield taskService.create({
                    title,
                    description,
                    status,
                    due_date,
                    user_id,
                    category_id,
                    priority_id,
                });
                res.status(201).json(task);
            }
            catch (error) {
                console.error("Erro ao criar tarefa:", error);
                res.status(500).json({ error: "Erro ao criar tarefa" });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield taskService.getAll();
                res.json(tasks);
            }
            catch (err) {
                console.error("Erro ao recuperar tarefas:", err);
                res.status(500).json({ error: "Erro ao recuperar tarefas." });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield taskService.getById(Number(req.params.id));
                if (task) {
                    res.json(task);
                }
                else {
                    res.status(404).json({ message: "Tarefa não encontrada" });
                }
            }
            catch (err) {
                console.error("Erro ao recuperar tarefa:", err);
                res.status(500).json({ error: "Erro ao recuperar tarefa." });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTask = yield taskService.update(Number(req.params.id), req.body);
                if (updatedTask) {
                    res.json(updatedTask);
                }
                else {
                    res.status(404).json({ message: "Tarefa não encontrada" });
                }
            }
            catch (err) {
                console.error("Erro ao atualizar tarefa:", err);
                res.status(500).json({ error: "Erro ao atualizar tarefa." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield taskService.delete(Number(req.params.id));
                res.json({ message: "Tarefa removida" });
            }
            catch (err) {
                console.error("Erro ao deletar tarefa:", err);
                res.status(500).json({ error: "Erro ao deletar tarefa." });
            }
        });
    }
}
exports.TaskController = TaskController;
