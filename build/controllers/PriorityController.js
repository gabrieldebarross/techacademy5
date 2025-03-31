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
exports.PriorityController = void 0;
const PriorityService_1 = require("../services/PriorityService");
const priorityService = new PriorityService_1.PriorityService();
class PriorityController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, user_id } = req.body;
                if (!name || !user_id) {
                    res.status(400).json({ error: "Campos obrigatórios faltando" });
                    return;
                }
                const priority = yield priorityService.create({
                    name,
                    description,
                    user_id,
                });
                res.status(201).json(priority);
            }
            catch (error) {
                console.error("Erro ao criar prioridade:", error);
                res.status(500).json({ error: error.message || "Erro ao criar prioridade" });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priorities = yield priorityService.getAll();
                res.json(priorities);
            }
            catch (err) {
                console.error("Erro ao recuperar prioridades:", err);
                res.status(500).json({ error: err.message || "Erro ao recuperar prioridades." });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priority = yield priorityService.getById(Number(req.params.id));
                if (priority) {
                    res.json(priority);
                }
                else {
                    res.status(404).json({ message: "Prioridade não encontrada" });
                }
            }
            catch (err) {
                console.error("Erro ao recuperar prioridade:", err);
                res.status(500).json({ error: err.message || "Erro ao recuperar prioridade." });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPriority = yield priorityService.update(Number(req.params.id), req.body);
                if (updatedPriority) {
                    res.json(updatedPriority);
                }
                else {
                    res.status(404).json({ message: "Prioridade não encontrada" });
                }
            }
            catch (err) {
                console.error("Erro ao atualizar prioridade:", err);
                res.status(500).json({ error: err.message || "Erro ao atualizar prioridade." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield priorityService.delete(Number(req.params.id));
                if (result === 0) {
                    res.status(404).json({ message: "Prioridade não encontrada" });
                }
                else {
                    res.json({ message: "Prioridade removida" });
                }
            }
            catch (err) {
                console.error("Erro ao deletar prioridade:", err);
                res.status(500).json({ error: err.message || "Erro ao deletar prioridade." });
            }
        });
    }
}
exports.PriorityController = PriorityController;
