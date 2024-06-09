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
const task_1 = __importDefault(require("../schemas/task"));
const utils_1 = require("../utils");
const create_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, priority, status, date, type } = req.body;
        const task = new task_1.default({
            title,
            description,
            priority,
            status,
            date,
            type,
            owner: req.user._id
        });
        yield task.save();
        res.status(201).send((0, utils_1.sendResponse)({ success: true, data: task }));
    }
    catch (err) {
        res.status(400).send((0, utils_1.sendResponse)({ success: false, message: String(err) }));
    }
});
const edit_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: _id } = req.params;
        const saveBody = req.body;
        const task = yield task_1.default.findOne({ _id });
        if (!task)
            return res.status(500).send((0, utils_1.sendResponse)({ success: false, message: 'Tarefa não encontrada.' }));
        Object.assign(task, saveBody);
        yield task.save();
        res.status(201).send((0, utils_1.sendResponse)({ success: true, data: task }));
    }
    catch (err) {
        res.status(400).send((0, utils_1.sendResponse)({ success: false, message: String(err) }));
    }
});
const delete_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: _id } = req.params;
        yield task_1.default.deleteOne({ _id });
        res.status(201).send((0, utils_1.sendResponse)({ success: true, message: 'Tarefa deletada com sucesso.' }));
    }
    catch (err) {
        res.status(400).send((0, utils_1.sendResponse)({ success: false, message: String(err) }));
    }
});
const list_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const find = yield task_1.default.find({ owner: user._id });
        if (!find)
            return res.status(400).send((0, utils_1.sendResponse)({ success: false, message: 'Ocorreu um erro ao buscar tarefas.' }));
        if (find.length === 0)
            return res.status(400).send((0, utils_1.sendResponse)({ success: false, message: 'Não foi encontrado nenhuma tarefa.' }));
        res.status(201).send((0, utils_1.sendResponse)({ success: true, data: find }));
    }
    catch (err) {
        res.status(400).send((0, utils_1.sendResponse)({ success: false, message: String(err) }));
    }
});
exports.default = {
    create_task,
    edit_task,
    delete_task,
    list_task,
};
