import { Request, Response } from "express";
import {
  addData,
  deleteData,
  getSingleData,
  getAllData,
  updateData,
} from "../models/companies";

export const fetchCompanies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAllData();
    res.status(200).send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "fail" });
  }
};

export const fetchACompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await getSingleData(id);
    res.status(200).send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "fail" });
  }
};

export const addCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { company_name, cin, pin } = req.body;
    await addData({ company_name, cin, pin });
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({ status: "fail" });
  }
};

export const updateCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await updateData({ ...req.body }, id);
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({ status: "fail" });
  }
};

export const deleteCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteData(id);
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({ status: "fail" });
  }
};
