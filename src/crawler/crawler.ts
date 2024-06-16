import axios from "axios";
import * as cheerio from "cheerio";

type ExtractedData = {
  companyName: string;
  url: string;
};

type SiteDetails = {
  siteTitle: string;
  host: string;
};

interface PotentialAction {
  "@type": string;
  target: string;
  "query-input": string;
}

interface JsonLd {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  potentialAction: PotentialAction;
}

interface PageInformation {
  siteDetails: SiteDetails;
  companies: ExtractedData[];
}

type CompanyDetails = {
  companyName: string;
  cin: string;
  pin: string;
};

type CompanyCollection = CompanyDetails[];

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

const extractEachPage = (html: any) => {
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
  // console.log(companyDetails);
  return companyDetails;
};

const extractAllData = async (html: any) => {
  const $ = cheerio.load(html);
  const companiesDetails: CompanyCollection = [];

  const companies: ExtractedData[] = [];
  const siteDetails: SiteDetails = {
    siteTitle: "",
    host: "",
  };
  const siteInfoScript = $(`script[type='application/ld+json']`);
  if (siteInfoScript.length > 0) {
    const jsonContent = siteInfoScript?.html()?.trim();
    if (jsonContent) {
      const parseData: JsonLd = JSON.parse(jsonContent);
      siteDetails.siteTitle = parseData.name;
      siteDetails.host = parseData.url.slice(0, parseData.url.length - 1);
    } else {
      console.log("Script tag found, but it is empty.");
    }
  }
  const mainContent = $("main");
  if (mainContent.length) {
    mainContent.find("a").each((_, element) => {
      companies.push({
        companyName: $(element).text(),
        url: $(element).attr("href") || "",
      });
    });
  }
  const pageInfo: PageInformation = {
    siteDetails,
    companies,
  };

  const {
    siteDetails: { host },
  } = pageInfo;

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

  return companiesDetails;
};

export const crawler = async () => {
  try {
    const url = `https://bit.ly/3lmNMTA`;
    const response = await fetchHtml(url);
    const filteredExtractedData = extractAllData(response);
    console.log(filteredExtractedData);
  } catch (error) {
    throw new Error(`Error while fetching main data: ${error}`);
  }
};
