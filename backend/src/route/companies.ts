import { Router } from "express";
import { addCompany, deleteCompany, fetchACompany, fetchCompanies, updateCompany } from "../controller/company";
import { searchCompanies } from "../controller/elasticSearch";

const clientRoute = Router()

clientRoute.get('/clients', fetchCompanies);
clientRoute.get('/clients/:id', fetchACompany);
clientRoute.post('/clients', addCompany);
clientRoute.put('/client/:id', updateCompany);
clientRoute.delete('/client/:id', deleteCompany);
clientRoute.get('/search', searchCompanies)

export default clientRoute;