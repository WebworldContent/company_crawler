"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCompanies = void 0;
const db_1 = __importDefault(require("../config/db"));
const addCompanies = async (data) => {
    try {
        const { companyName, cin, pin } = data;
        await (0, db_1.default)((connection) => connection?.execute(`insert into companies (company_name, cin, pin) values('${companyName}', '${cin}', '${pin}')`));
    }
    catch (err) {
        console.log("Error inserting data", err);
        throw err;
    }
};
exports.addCompanies = addCompanies;
