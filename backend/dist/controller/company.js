"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.addCompany = exports.fetchACompany = exports.fetchCompanies = void 0;
const companies_1 = require("../models/companies");
const fetchCompanies = async (req, res) => {
    try {
        console.log('jhgjhgjhghj');
        const { limit, offset } = req.query;
        const result = await (0, companies_1.getAllData)(limit || '', offset || '');
        res.status(200).send({ status: "success", result });
    }
    catch (error) {
        res.status(500).send({ status: "fail" });
    }
};
exports.fetchCompanies = fetchCompanies;
const fetchACompany = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, companies_1.getSingleData)(id);
        res.status(200).send({ status: "success", result });
    }
    catch (error) {
        res.status(500).send({ status: "fail" });
    }
};
exports.fetchACompany = fetchACompany;
const addCompany = async (req, res) => {
    try {
        const { company_name, cin, pin } = req.body;
        await (0, companies_1.addData)({ company_name, cin, pin });
        res.status(200).send({ status: "success" });
    }
    catch (error) {
        res.status(500).send({ status: "fail" });
    }
};
exports.addCompany = addCompany;
const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, companies_1.updateData)({ ...req.body }, id);
        res.status(200).send({ status: "success" });
    }
    catch (error) {
        res.status(500).send({ status: "fail" });
    }
};
exports.updateCompany = updateCompany;
const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, companies_1.deleteData)(id);
        res.status(200).send({ status: "success" });
    }
    catch (error) {
        res.status(500).send({ status: "fail" });
    }
};
exports.deleteCompany = deleteCompany;
