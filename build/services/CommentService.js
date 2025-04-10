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
exports.CommentService = void 0;
const Comment_1 = __importDefault(require("../database/models/Comment"));
class CommentService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Comment_1.default.create(data);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Comment_1.default.findAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Comment_1.default.findByPk(id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield Comment_1.default.findByPk(id);
            if (!comment)
                return null;
            return yield comment.update(data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Comment_1.default.destroy({ where: { id } });
        });
    }
}
exports.CommentService = CommentService;
