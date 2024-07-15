import { Worker } from 'worker_threads';
import axios from "axios";
import * as cheerio from "cheerio";

interface SiteDetails {
  siteTitle: string;
  host: string;
}

const fetchHtml = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(`Error fetching the URL: ${error}`);
  }
};

const extractAllData = async (html: string): Promise<string> => {
  const $ = cheerio.load(html);
  const siteDetails: SiteDetails = {
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
    } else {
      console.log("Script tag found, but it is empty.");
    }
  }
  return siteDetails.host;
};

const runWorker = (workerData: { html: string; host: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./dist/crawler/worker.js', { workerData });
    worker.on('message', (msg) => {
      console.log('Worker message received:', msg);
      resolve(msg)
    });
    worker.on('error', (error) => {
      console.error('Worker error:', error);
      reject(error);
    });
    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
        reject(new Error(`Worker stopped with exit code ${code}`));
      } else {
        console.log('Worker exited successfully');
      }
    });
  });
};

export const crawler = async () => {
  try {
    console.log('Starting crawler');
    const url = `https://www.companydetails.in/state/uttar-pradesh`;
    const response = await fetchHtml(url);
    console.log('Fetched main page');
    const host = await extractAllData(response);
    console.log('Extracted site details:', host);
    const result = await runWorker({ html: response, host });
    console.log('Final result:', result);
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};
