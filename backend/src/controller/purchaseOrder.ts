import { Request, Response } from "express";
import { validateParsedCsv } from "../utils/validateParsedCsv";
import { csvToArray } from "../utils/csvToArray";
import { saveDataToJson, getDataFromJson } from "../utils/saveDataToJson";
export const createPurchaseOrder = (req: Request, res: Response) => {
  try {
    const jsonVendorDetails = req.body?.vendor;
    const vendorDetails = JSON.parse(jsonVendorDetails);
    if (!vendorDetails) {
      return res.status(400).send({ message: "Inavlid vendor details" });
    }

    const csvFile = req.files?.csvFile;

    if (!csvFile) {
      return res.status(400).send({ message: "Inavlid File" });
    }

    // @ts-ignore

    const csvData = new Buffer.from(csvFile.data);

    const csvString = csvData.toString();

    const parsedRecords = csvToArray(csvString);

    const error = validateParsedCsv(parsedRecords);

    if (error) {
      return res.status(400).send({ message: error });
    }

    saveDataToJson(vendorDetails.vendorName, parsedRecords);

    return res.status(201).json({ message: "Successfull Uploaded!" });
  } catch (err: any) {
    return res
      .status(400)
      .json({ message: err?.message || "Something went wrong" });
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
