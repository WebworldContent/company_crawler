"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dbConfig_1 = __importDefault(require("./dbConfig"));
const pool = promise_1.default.createPool(dbConfig_1.default);
const conn = async (callback) => {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Connected to MySQL Server DB');
        return callback(connection);
    }
    catch (err) {
        console.error('Error executing with MySQL connection: ', err);
        throw err;
    }
    finally {
        if (connection) {
            try {
                connection.release();
                console.log('Connection released');
            }
            catch (releaseError) {
                console.error('Error releasing MySQL connection: ', releaseError);
            }
        }
    }
};
exports.default = conn;
