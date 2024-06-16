"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const fetchHtml = async (url) => {
    try {
        const { data } = await axios_1.default.get(url);
        return data;
    }
    catch (error) {
        throw new Error(`Error fetching the URL: ${error}`);
    }
};
const extractTextFromColumns = ($, selector, col1Class, col2Class) => {
    const leftContent = $(selector)
        .find(col1Class)
        .text()
        .trim()
        .split("\n")
        .map((item) => item.trim())
        .filter((data) => data.length);
    const rightContent = $(selector)
        .find(col2Class)
        .text()
        .trim()
        .split("\n")
        .map((item) => item.trim())
        .filter((data) => data.length);
    return { leftContent, rightContent };
};
const extractEachPage = (html) => {
    const $ = cheerio.load(html);
    const companyDetails = { companyName: "", cin: "", pin: "" };
    const basicDetails = $("#basicdetails").html();
    const contactDetails = $("#CONTACT-DETAILS").html();
    if (basicDetails?.length) {
        const $r = cheerio.load(basicDetails);
        const { rightContent } = extractTextFromColumns($r, ".row", ".col-xl-3", ".col-xl-9");
        companyDetails.companyName = rightContent[0].trim();
        companyDetails.cin = rightContent[4].trim();
    }
    if (contactDetails?.length) {
        const $r = cheerio.load(contactDetails);
        const { rightContent } = extractTextFromColumns($r, ".row", ".col-xl-4", ".col-xl-8");
        companyDetails.pin = rightContent[1].trim();
    }
    return companyDetails;
};
const extractAllData = async (html, host) => {
    const $ = cheerio.load(html);
    const companiesDetails = [];
    const companies = [];
    const mainContent = $("main");
    if (mainContent.length) {
        mainContent.find("a").each((_, element) => {
            companies.push({
                companyName: $(element).text(),
                url: $(element).attr("href") || "",
            });
        });
    }
    for (const data of companies) {
        try {
            const { url } = data;
            const response = await fetchHtml(`${host}${url}`);
            const eachPageData = extractEachPage(response);
            console.log(eachPageData);
            companiesDetails.push(eachPageData); // this is where i can push data continuosly to DB
        }
        catch (error) {
            throw new Error(`Error while fetching page data: ${error}`);
        }
    }
    console.log(companiesDetails);
    return companiesDetails;
};
(async () => {
    try {
        const { html, host } = worker_threads_1.workerData;
        const result = await extractAllData(html, host);
        worker_threads_1.parentPort?.postMessage(result);
    }
    catch (error) {
        worker_threads_1.parentPort?.postMessage({ error });
    }
})();
