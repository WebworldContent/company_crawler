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
exports.crawler = void 0;
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
    const companyDetails = { company_name: "", cin: "", pin: "" };
    const basicDetails = $("#basicdetails").html();
    const contactDetails = $("#CONTACT-DETAILS").html();
    if (basicDetails?.length) {
        const $r = cheerio.load(basicDetails);
        const { rightContent } = extractTextFromColumns($r, ".row", ".col-xl-3", ".col-xl-9");
        companyDetails.company_name = rightContent[0].trim();
        companyDetails.cin = rightContent[4].trim();
    }
    if (contactDetails?.length) {
        const $r = cheerio.load(contactDetails);
        const { rightContent } = extractTextFromColumns($r, ".row", ".col-xl-4", ".col-xl-8");
        companyDetails.pin = rightContent[1].trim();
    }
    // console.log(companyDetails);
    return companyDetails;
};
const extractAllData = async (html) => {
    const $ = cheerio.load(html);
    const companiesDetails = [];
    const companies = [];
    const siteDetails = {
        siteTitle: "",
        host: "",
    };
    const siteInfoScript = $(`script[type='application/ld+json']`);
    if (siteInfoScript.length > 0) {
        const jsonContent = siteInfoScript?.html()?.trim();
        if (jsonContent) {
            const parseData = JSON.parse(jsonContent);
            siteDetails.siteTitle = parseData.name;
            siteDetails.host = parseData.url.slice(0, parseData.url.length - 1);
        }
        else {
            console.log("Script tag found, but it is empty.");
        }
    }
    const mainContent = $("main");
    if (mainContent.length) {
        mainContent.find("a").each((_, element) => {
            companies.push({
                company_name: $(element).text(),
                url: $(element).attr("href") || "",
            });
        });
    }
    const pageInfo = {
        siteDetails,
        companies,
    };
    const { siteDetails: { host }, } = pageInfo;
    for (const data of companies) {
        try {
            const { url } = data;
            const response = await fetchHtml(`${host}${url}`);
            const eachPageData = extractEachPage(response);
            companiesDetails.push(eachPageData);
        }
        catch (error) {
            throw new Error(`Error while fetching page data: ${error}`);
        }
    }
    return companiesDetails;
};
const crawler = async () => {
    try {
        const url = `https://bit.ly/3lmNMTA`;
        const response = await fetchHtml(url);
        const filteredExtractedData = extractAllData(response);
        console.log(filteredExtractedData);
    }
    catch (error) {
        throw new Error(`Error while fetching main data: ${error}`);
    }
};
exports.crawler = crawler;
