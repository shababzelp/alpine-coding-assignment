import fs from "fs";
import path from "path";

const absPath = path.join(__dirname, "..", "..", "data.json");

export const saveDataToJson = (vendorName: string, data: any[]) => {
  const rawData = fs.readFileSync(absPath, "utf-8");
  const parsedData = JSON.parse(rawData);
  const updatedData = { ...parsedData };

  if (Object.keys(parsedData).includes(vendorName)) {
    updatedData[vendorName] = [...updatedData[vendorName], ...data];
  } else {
    updatedData[vendorName] = data;
  }
  const updatedJsonData = JSON.stringify(updatedData);
  fs.writeFileSync(absPath, updatedJsonData);
};

export const getDataFromJson = () => {
  const rawData = fs.readFileSync(absPath, "utf-8");
  const parsedData = JSON.parse(rawData);
  return parsedData;
};
