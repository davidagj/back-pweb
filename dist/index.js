"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const BD_STRING = String(process.env.MONGODB_URI) || 'mongodb://localhost:27017/mydatabase';
app.use(express_1.default.json());
mongoose_1.default.connect(BD_STRING, {
    dbName: 'to-do',
}).then(() => {
    console.log('Connected to MongoDB 🤞');
}).catch(err => {
    console.error('Error connecting to MongoDB 🤔', err);
});
app.use('/', routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 👌`);
});
