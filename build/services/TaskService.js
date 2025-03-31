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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const Task_1 = __importDefault(require("../database/models/Task"));
class TaskService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Task_1.default.create(data);
            }
            catch (error) {
                console.error("Erro ao criar tarefa:", error);
                throw new Error("Erro ao criar tarefa.");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Task_1.default.findAll();
            }
            catch (error) {
                console.error("Erro ao obter tarefas:", error);
                throw new Error("Erro ao obter tarefas.");
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Task_1.default.findByPk(id);
            }
            catch (error) {
                console.error("Erro ao buscar tarefa:", error);
                throw new Error("Erro ao buscar tarefa.");
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Task_1.default.findByPk(id);
                if (!task) {
                    throw new Error("Tarefa não encontrada");
                }
                return yield task.update(data);
            }
            catch (error) {
                console.error("Erro ao atualizar tarefa:", error);
                throw new Error(error.message || "Erro ao atualizar tarefa.");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Task_1.default.findByPk(id);
                if (!task) {
                    throw new Error("Tarefa não encontrada");
                }
                return yield Task_1.default.destroy({ where: { id } });
            }
            catch (error) {
                console.error("Erro ao deletar tarefa:", error);
                throw new Error(error.message || "Erro ao deletar tarefa.");
            }
        });
    }
}
exports.TaskService = TaskService;
