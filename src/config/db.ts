import mysql from 'mysql2/promise';
import dbConfig from "./dbConfig";

const pool = mysql.createPool(dbConfig);

export type ConnectionObject = mysql.PoolConnection | undefined;
export type MyCallback = (data: ConnectionObject) => Promise<[mysql.QueryResult, mysql.FieldPacket[]]>;

const conn = async (callback: MyCallback): Promise<[mysql.QueryResult, mysql.FieldPacket[]]> => {
    let connection: ConnectionObject;
    try {
        connection = await pool.getConnection();
        console.log('Connected to MySQL Server DB');

        return await callback(connection);
    } catch (err) {
        console.error('Error executing with MySQL connection: ', err);
        throw err;
    } finally {
        if (connection) {
            try {
                connection.release();
                console.log('Connection released');
            } catch (releaseError) {
                console.error('Error releasing MySQL connection: ', releaseError);
            }
        }
    }
};

export default conn;