"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCompanies = void 0;
const elasticConfig_1 = __importDefault(require("../config/elasticConfig"));
const searchCompanies = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== "string") {
            res.status(400).send({
                status: "fail",
                msg: 'Missing or invalid "field" query parameter.',
            });
            return;
        }
        const response = await elasticConfig_1.default.search({
            index: "companies",
            body: {
                query: {
                    multi_match: {
                        query: q,
                        fields: ["company_name", "pin", "cin"],
                    },
                },
            },
        });
        console.log(q, response);
        res.status(200).send({ result: response.hits.hits, status: "success" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", msg: "An error occurred" });
    }
};
exports.searchCompanies = searchCompanies;
