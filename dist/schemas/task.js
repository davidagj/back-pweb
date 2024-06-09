"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskType = exports.TaskPriority = exports.TaskStatus = void 0;
const mongoose_1 = require("mongoose");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Pending"] = "pending";
    TaskStatus["Doing"] = "doing";
    TaskStatus["Done"] = "done";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
;
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["Low"] = "low";
    TaskPriority["Middle"] = "middle";
    TaskPriority["High"] = "high";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
;
var TaskType;
(function (TaskType) {
    TaskType["Particular"] = "particular";
    TaskType["Professional"] = "professional";
    TaskType["Academic"] = "academic";
})(TaskType || (exports.TaskType = TaskType = {}));
const TaskSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(TaskStatus), required: true, default: TaskStatus.Pending },
    priority: { type: String, enum: Object.values(TaskPriority), required: true, default: TaskPriority.Low },
    type: { type: String, enum: Object.values(TaskType), required: true, default: TaskType.Particular },
    title: { type: String, required: true },
    description: { type: String },
    date: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
TaskSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const Task = (0, mongoose_1.model)('Task', TaskSchema);
exports.default = Task;
