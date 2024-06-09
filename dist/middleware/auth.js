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
const utils_1 = require("../utils");
const user_1 = __importDefault(require("../schemas/user"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Access denied. No token provided.');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied. Invalid token.');
    }
    const decoded = (0, utils_1.verifyJWT)(token);
    if (!decoded) {
        return res.status(401).send('Access denied. Invalid token.');
    }
    const user = yield user_1.default.findOne({ email: decoded.email });
    if (!user) {
        return res.status(401).send('Is not user e-mail valid.');
    }
    req.user = user;
    next();
});
exports.default = authMiddleware;
