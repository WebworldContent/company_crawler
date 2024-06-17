import conn from "../config/db";
import { CompanyDetails } from "../crawler/worker";


export const addCompanies = async (data: CompanyDetails): Promise<void> => {
  try {
    const {companyName, cin, pin} = data;
    await conn((connection) =>
      connection?.execute(
        `insert into companies (company_name, cin, pin) values('${companyName}', '${cin}', '${pin}')`
      )
    );
  } catch (err) {
    console.log("Error inserting data", err);
    throw err;
  }
};
