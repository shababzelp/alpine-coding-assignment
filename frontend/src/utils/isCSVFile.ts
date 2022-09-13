export const isCSVFile = (file: File | null) => {
  if (!file) return false;
  const regEx = /.+(\.csv)$/;

  return regEx.test(file.name);
};
