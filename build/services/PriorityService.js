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
exports.PriorityService = void 0;
const Priority_1 = __importDefault(require("../database/models/Priority"));
class PriorityService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Priority_1.default.create(data);
            }
            catch (error) {
                console.error("Erro ao criar prioridade:", error);
                throw new Error("Erro ao criar prioridade.");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Priority_1.default.findAll();
            }
            catch (error) {
                console.error("Erro ao obter prioridades:", error);
                throw new Error("Erro ao obter prioridades.");
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Priority_1.default.findByPk(id);
            }
            catch (error) {
                console.error("Erro ao buscar prioridade:", error);
                throw new Error("Erro ao buscar prioridade.");
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priority = yield Priority_1.default.findByPk(id);
                if (!priority) {
                    throw new Error("Prioridade não encontrada");
                }
                return yield priority.update(data);
            }
            catch (error) {
                console.error("Erro ao atualizar prioridade:", error);
                throw new Error(error.message || "Erro ao atualizar prioridade.");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priority = yield Priority_1.default.findByPk(id);
                if (!priority) {
                    throw new Error("Prioridade não encontrada");
                }
                return yield Priority_1.default.destroy({ where: { id } });
            }
            catch (error) {
                console.error("Erro ao deletar prioridade:", error);
                throw new Error(error.message || "Erro ao deletar prioridade.");
            }
        });
    }
}
exports.PriorityService = PriorityService;
