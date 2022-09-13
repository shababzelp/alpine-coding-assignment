export const csvToArray = (csvString: string) => {
  // The array we're going to build
  const csvArray = [];
  // Break it into rows to start
  const csvRows = csvString.split(/\r\n/);

  // Take off the first line to get the headers, then split that into an array
  const csvHeaders = csvRows.shift()?.split(",") as string[];

  // Loop through remaining rows
  for (let rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
    const rowArray = csvRows[rowIndex].split(",");

    // Create a new row object to store our data.
    const rowObject: any = (csvArray[rowIndex] = {});

    // Then iterate through the remaining properties and use the headers as keys
    for (let propIndex = 0; propIndex < rowArray.length; ++propIndex) {
      // Grab the value from the row array we're looping through...
      const propValue = rowArray[propIndex];
      // ...also grab the relevant header (the RegExp in both of these removes quotes)
      const propLabel = csvHeaders[propIndex];

      rowObject[propLabel.trim()] = propValue;
    }
  }
  return csvArray;
};
