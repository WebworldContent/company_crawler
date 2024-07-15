"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = exports.deleteData = exports.getSingleData = exports.getAllData = exports.addData = void 0;
const db_1 = __importDefault(require("../config/db"));
const addData = async (data) => {
    try {
        const { company_name, cin, pin } = data;
        await (0, db_1.default)((connection) => {
            if (connection) {
                return connection?.execute(`insert into companies (company_name, cin, pin) values('${company_name}', '${cin}', '${pin}')`);
            }
        });
    }
    catch (err) {
        console.log("Error inserting data", err);
        throw err;
    }
};
exports.addData = addData;
const getAllData = async (limit = '30', offset = '0') => {
    try {
        const response = await (0, db_1.default)((connection) => {
            if (connection) {
                return connection?.execute(`select * from companies limit ${limit} offset ${offset}`);
            }
        });
        if (!response) {
            throw new Error("No response from database");
        }
        const [rows] = response;
        return rows;
    }
    catch (err) {
        console.log("Error fetching all data", err);
        throw err;
    }
};
exports.getAllData = getAllData;
const getSingleData = async (id) => {
    try {
        const response = await (0, db_1.default)((connection) => {
            if (connection) {
                return connection?.execute(`select * from companies where id = ${id}`);
            }
        });
        if (!response) {
            throw new Error("No response from database");
        }
        const [rows] = response;
        return rows;
    }
    catch (err) {
        console.log("Error fetching single data", err);
        throw err;
    }
};
exports.getSingleData = getSingleData;
const deleteData = async (id) => {
    try {
        await (0, db_1.default)((connection) => {
            if (connection) {
                return connection?.execute(`delete from companies where id = ${id}`);
            }
        });
    }
    catch (err) {
        console.log("Error fetching data", err);
        throw err;
    }
};
exports.deleteData = deleteData;
const updateData = async (data, id) => {
    try {
        const { company_name, cin, pin } = data;
        console.log(data, id);
        await (0, db_1.default)((connection) => {
            if (connection) {
                return connection?.execute(`update companies set company_name='${company_name}', cin='${cin}', pin='${pin}' where id = ${id}`);
            }
        });
    }
    catch (err) {
        console.log("Error updating data", err);
        throw err;
    }
};
exports.updateData = updateData;
