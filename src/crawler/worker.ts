import { parentPort, workerData } from "worker_threads";
import axios from "axios";
import * as cheerio from "cheerio";

type CompanyDetails = {
  companyName: string;
  cin: string;
  pin: string;
};

const fetchHtml = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(`Error fetching the URL: ${error}`);
  }
};

const extractTextFromColumns = (
  $: cheerio.Root,
  selector: string,
  col1Class: string,
  col2Class: string
): { leftContent: string[]; rightContent: string[] } => {
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

const extractEachPage = (html: string) => {
  const $ = cheerio.load(html);
  const companyDetails: CompanyDetails = { companyName: "", cin: "", pin: "" };
  const basicDetails = $("#basicdetails").html();
  const contactDetails = $("#CONTACT-DETAILS").html();

  if (basicDetails?.length) {
    const $r = cheerio.load(basicDetails);
    const { rightContent } = extractTextFromColumns(
      $r,
      ".row",
      ".col-xl-3",
      ".col-xl-9"
    );
    companyDetails.companyName = rightContent[0].trim();
    companyDetails.cin = rightContent[4].trim();
  }

  if (contactDetails?.length) {
    const $r = cheerio.load(contactDetails);
    const { rightContent } = extractTextFromColumns(
      $r,
      ".row",
      ".col-xl-4",
      ".col-xl-8"
    );
    companyDetails.pin = rightContent[1].trim();
  }

  return companyDetails;
};

const extractAllData = async (
  html: string,
  host: string
): Promise<CompanyDetails[]> => {
  const $ = cheerio.load(html);
  const companiesDetails: CompanyDetails[] = [];
  const companies: { companyName: string; url: string }[] = [];

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
      companiesDetails.push(eachPageData);
    } catch (error) {
      throw new Error(`Error while fetching page data: ${error}`);
    }
  }

  console.log(companiesDetails);
  return companiesDetails;
};

(async () => {
  try {
    const { html, host } = workerData;
    const result = await extractAllData(html, host);
    parentPort?.postMessage(result);
  } catch (error) {
    parentPort?.postMessage({ error });
  }
})();