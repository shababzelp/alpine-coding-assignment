import { Request, Response } from "express";
export const createPurchaseOrder = (req: Request, res: Response) => {
  const jsonVendorDetails = req.body?.vendor;
  const vendorDetails = JSON.parse(jsonVendorDetails);
  if (!vendorDetails) {
    res.status(400).send({ message: "Inavlid vendor details" });
  }

  const csvFile = req.files?.csvFile;
  if (!csvFile) {
    res.status(400).send({ message: "Inavlid File" });
  }
  console.log({ vendorDetails, csvFile });

  res.status(200).json({ message: "hello world" });
};

export default { createPurchaseOrder };
