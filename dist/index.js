"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const main_1 = require("./crawler/main");
const companies_1 = __importDefault(require("./route/companies"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.get('/', async (req, res, next) => {
    await (0, main_1.crawler)();
    res.send('Hello World');
});
app.use(companies_1.default);
app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`));
