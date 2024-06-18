import { QueryResult } from "mysql2";
import conn from "../config/db";
import { CompanyDetails } from "../crawler/worker";

export const addCompanies = async (data: CompanyDetails): Promise<void> => {
  try {
    const { company_name, cin, pin } = data;
    await conn((connection: any) => {
      if (connection) {
        return connection?.execute(
          `insert into companies (company_name, cin, pin) values('${company_name}', '${cin}', '${pin}')`
        );
      }
    });
  } catch (err) {
    console.log("Error inserting data", err);
    throw err;
  }
};

export const getAllCompanies = async (): Promise<QueryResult> => {
  try {
    const response = await conn((connection: any) => {
      if (connection) {
        return connection?.execute(
          `select * from companies`
        );
      }
    });

    if (!response) {
      throw new Error("No response from database");
    }

    const [rows] = response;
    return rows;
  } catch (err) {
    console.log("Error inserting data", err);
    throw err;
  }
};
