"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./controllers/user"));
const task_1 = __importDefault(require("./controllers/task"));
const auth_1 = __importDefault(require("./middleware/auth"));
const router = (0, express_1.Router)();
router.post('/users', user_1.default.create_user);
router.post('/sign-in', user_1.default.sign_in);
router.use(auth_1.default);
router.post('/tasks', task_1.default.create_task);
router.patch('/tasks/:id', task_1.default.edit_task);
router.delete('/tasks/:id', task_1.default.delete_task);
router.get('/tasks', task_1.default.list_task);
exports.default = router;
