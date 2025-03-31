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
exports.CommentController = void 0;
const CommentService_1 = require("../services/CommentService");
const commentService = new CommentService_1.CommentService();
class CommentController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield commentService.create(req.body);
                res.status(201).json(comment);
            }
            catch (error) {
                res.status(500).json({ error: "Erro ao criar comentário" });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield commentService.getAll());
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield commentService.getById(Number(req.params.id));
            comment ? res.json(comment) : res.status(404).json({ message: "Comentário não encontrado" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedComment = yield commentService.update(Number(req.params.id), req.body);
            updatedComment ? res.json(updatedComment) : res.status(404).json({ message: "Comentário não encontrado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield commentService.delete(Number(req.params.id));
            res.json({ message: "Comentário removido" });
        });
    }
}
exports.CommentController = CommentController;
