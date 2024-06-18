import { QueryResult } from "mysql2";
import conn from "../config/db";
import { CompanyDetails } from "../crawler/worker";

export const addData = async (data: CompanyDetails): Promise<void> => {
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

export const getAllData = async (): Promise<QueryResult> => {
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
    console.log("Error fetching all data", err);
    throw err;
  }
};

export const getSingleData = async (id: string): Promise<QueryResult> => {
  try {
    const response = await conn((connection: any) => {
      if (connection) {
        return connection?.execute(
          `select * from companies where id = ${id}`
        );
      }
    });

    if (!response) {
      throw new Error("No response from database");
    }

    const [rows] = response;
    return rows;
  } catch (err) {
    console.log("Error fetching single data", err);
    throw err;
  }
};

export const deleteData = async (id: string): Promise<void> => {
  try {
    await conn((connection: any) => {
      if (connection) {
        return connection?.execute(
          `delete from companies where id = ${id}`
        );
      }
    });

  } catch (err) {
    console.log("Error fetching data", err);
    throw err;
  }
};

export const updateData = async (data: CompanyDetails, id: string): Promise<void> => {
  try {
    const {company_name, cin, pin} = data;
    await conn((connection: any) => {
      if (connection) {
        return connection?.execute(
          `update companies set company_name='${company_name}', cin='${cin}', pin='${pin}' where id = ${id}`
        );
      }
    });

  } catch (err) {
    console.log("Error updating data", err);
    throw err;
  }
};