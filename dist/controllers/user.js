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
const user_1 = __importDefault(require("../schemas/user"));
const utils_1 = require("../utils");
const create_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const hashpassword = yield (0, utils_1.hashPassword)(password);
        const user = new user_1.default(Object.assign(Object.assign({}, req.body), { password: hashpassword }));
        yield user.save();
        const data = {
            name: user.name,
            email: user.email,
        };
        res.status(201).send((0, utils_1.sendResponse)({ success: true, data }));
    }
    catch (err) {
        res.status(400).send((0, utils_1.sendResponse)({ success: false, message: String(err) }));
    }
});
const sign_in = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user)
            return res.status(400).send((0, utils_1.sendResponse)({ success: false, message: 'Senha ou e-mail incorreto.' }));
        const isCorrectPassword = yield (0, utils_1.comparePassword)(password, user.password);
        if (!isCorrectPassword)
            return res.status(400).send((0, utils_1.sendResponse)({ success: false, message: 'Senha ou e-mail incorreto.' }));
        const token = (0, utils_1.generateJWT)({ email: user.email });
        const data = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token
        };
        res.status(201).send((0, utils_1.sendResponse)({ success: true, data }));
    }
    catch (err) {
        res.status(400).send((0, utils_1.sendResponse)({ success: false, message: String(err) }));
    }
});
exports.default = {
    create_user,
    sign_in,
};
