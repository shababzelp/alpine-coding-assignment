import { Request, Response } from "express";
import { parse } from "csv-parse/sync";
import { validateParsedCsv } from "../utils/validateParsedCsv";
import { saveDataToJson, getDataFromJson } from "../utils/saveDataToJson";
export const createPurchaseOrder = (req: Request, res: Response) => {
  try {
    const jsonVendorDetails = req.body?.vendor;
    const vendorDetails = JSON.parse(jsonVendorDetails);
    if (!vendorDetails) {
      res.status(400).send({ message: "Inavlid vendor details" });
    }

    const csvFile = req.files?.csvFile;
    if (!csvFile) {
      res.status(400).send({ message: "Inavlid File" });
    }

    // @ts-ignore
    const parsedRecords = parse(csvFile.data, {
      columns: true,
      skip_empty_lines: true,
    });
    const error = validateParsedCsv(parsedRecords);
    if (error) {
      res.status(400).send({ message: error });
    }

    saveDataToJson(vendorDetails.vendorName, parsedRecords);

    res.status(201).json({ message: "Successfull Uploaded!" });
  } catch (err: any) {
    res.status(400).json({ message: err?.message || "Something went wrong" });
  }
};

export const getPurchaseOrder = (req: Request, res: Response) => {
  try {
    const purchaseOrders = getDataFromJson();
    res.status(200).json(purchaseOrders);
  } catch (err: any) {
    res.status(400).json({ message: err?.message || "Something went wrong" });
  }
};

export default { createPurchaseOrder, getPurchaseOrder };
