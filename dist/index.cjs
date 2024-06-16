"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const main_1 = require("./crawler/main");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.get('/', async (req, res, next) => {
    await (0, main_1.crawler)();
    res.send('Hello World');
});
app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`));
