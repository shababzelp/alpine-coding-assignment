export const validateParsedCsv = (data: any[]) => {
  let error: undefined | string = undefined;
  for (const item of data) {
    if (!isNaN(Number(item["model_number"]))) {
      error = `Model number should be a string but found ${item["model_number"]}`;
      break;
    }
    if (isNaN(Number(item["unit_price"]))) {
      error = `Unit price should be a number but found ${item["unit_price"]}`;
      break;
    }
    if (isNaN(Number(item["quantity"]))) {
      error = `Quantity should be a number but found ${item["quantity"]}`;
      break;
    }
  }
  return error;
};
