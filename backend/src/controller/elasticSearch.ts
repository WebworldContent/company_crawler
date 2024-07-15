import esClient from "../config/elasticConfig";
import { Request, Response } from "express";
import { estypes } from "@elastic/elasticsearch";

interface SearchResponse {
  hits: {
    hits: Array<{
      _index: string;
      _type: string;
      _id: string;
      _score: number;
      _source: any;
    }>;
  };
}

export const searchCompanies = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      res.status(400).send({
        status: "fail",
        msg: 'Missing or invalid "field" query parameter.',
      });
      return;
    }

    const response: estypes.SearchResponse<SearchResponse> =
      await esClient.search({
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
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", msg: "An error occurred" });
  }
};
