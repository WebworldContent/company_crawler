"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@elastic/elasticsearch");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ES_PORT = process.env.ES_PORT;
const esClient = new elasticsearch_1.Client({ node: `http://localhost:${ES_PORT}` });
exports.default = esClient;
