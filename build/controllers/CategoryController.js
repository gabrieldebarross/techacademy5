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
exports.CategoryController = void 0;
const CategoryService_1 = require("../services/CategoryService");
const categoryService = new CategoryService_1.CategoryService();
class CategoryController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield categoryService.create(req.body);
                res.status(201).json(category);
            }
            catch (error) {
                console.error("Erro ao criar categoria:", error);
                res.status(500).json({ error: "Erro ao criar categoria", message: error.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categoryService.getAll();
                res.json(categories);
            }
            catch (error) {
                console.error("Erro ao obter categorias:", error);
                res.status(500).json({ error: "Erro ao obter categorias", message: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield categoryService.getById(Number(req.params.id));
                if (category) {
                    res.json(category);
                }
                else {
                    res.status(404).json({ message: "Categoria não encontrada" });
                }
            }
            catch (error) {
                console.error("Erro ao buscar categoria:", error);
                res.status(500).json({ error: "Erro ao buscar categoria", message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield categoryService.update(Number(req.params.id), req.body);
                if (updatedCategory) {
                    res.json(updatedCategory);
                }
                else {
                    res.status(404).json({ message: "Categoria não encontrada" });
                }
            }
            catch (error) {
                console.error("Erro ao atualizar categoria:", error);
                res.status(500).json({ error: "Erro ao atualizar categoria", message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield categoryService.delete(Number(req.params.id));
                if (result) {
                    res.json({ message: "Categoria removida" });
                }
                else {
                    res.status(404).json({ message: "Categoria não encontrada" });
                }
            }
            catch (error) {
                console.error("Erro ao remover categoria:", error);
                res.status(500).json({ error: "Erro ao remover categoria", message: error.message });
            }
        });
    }
}
exports.CategoryController = CategoryController;
