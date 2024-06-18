import { Router } from "express";
import { addCompany, deleteCompany, fetchACompany, fetchCompanies, updateCompany } from "../controller/company";

const clientRoute = Router()

clientRoute.get('/clients', fetchCompanies);
clientRoute.get('/clients/:id', fetchACompany);
clientRoute.post('/clients', addCompany);
clientRoute.put('/client/:id', updateCompany);
clientRoute.delete('/client/:id', deleteCompany);

export default clientRoute;