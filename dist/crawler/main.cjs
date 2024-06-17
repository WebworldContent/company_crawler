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
const extractAllData = async (html) => {
    const $ = cheerio.load(html);
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
    return siteDetails.host;
};
const runWorker = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker = new worker_threads_1.Worker('./dist/crawler/worker.cjs', { workerData });
        worker.on('message', (msg) => {
            console.log('Worker message received:', msg);
            resolve(msg);
        });
        worker.on('error', (error) => {
            console.error('Worker error:', error);
            reject(error);
        });
        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
            else {
                console.log('Worker exited successfully');
            }
        });
    });
};
const crawler = async () => {
    try {
        console.log('Starting crawler');
        const url = `https://www.companydetails.in/state/uttar-pradesh`;
        const response = await fetchHtml(url);
        console.log('Fetched main page');
        const host = await extractAllData(response);
        console.log('Extracted site details:', host);
        const result = await runWorker({ html: response, host });
        console.log('Final result:', result);
    }
    catch (error) {
        console.error(`Error: ${error}`);
        throw error;
    }
};
exports.crawler = crawler;
