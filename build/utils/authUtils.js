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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';
class authUtils {
    static generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payloadUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            return jsonwebtoken_1.default.sign({ payloadUser }, String(JWT_SECRET), { expiresIn: JWT_EXPIRES_IN });
        });
    }
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, String(JWT_SECRET), (err, decoded) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
        });
    }
}
exports.default = authUtils;
