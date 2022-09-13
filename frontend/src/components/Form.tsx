import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { isCSVFile } from "../utils/isCSVFile";
import api from "../utils/api";
import styles from "./Form.module.css";
export const Form = () => {
  const [state, setState] = useState({
    date: new Date(),
    vendorName: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    alert("submitted");
    e.preventDefault();
    let file: File | null = null;
    if (fileInputRef.current?.files && fileInputRef.current?.files[0]) {
      file = fileInputRef.current?.files[0];
    }
    if (!file) {
      alert("No file uploaded");
      return;
    }
    const isValidFilename = isCSVFile(file);
    if (!isValidFilename) {
      alert("Invalid file");
      return;
    }
    const formData = new FormData();
    formData.append("csvFile", file);
    formData.append("vendor", JSON.stringify(state));

    const res = await api.post("/purchaseOrder", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log({ res });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label htmlFor="date">
        Date:
        <input
          name="date"
          type="date"
          value={state.date.toString()}
          onChange={onChange}
        />
      </label>
      <br />
      <label htmlFor="vendorName">
        Vendor Name:
        <input
          name="vendorName"
          type="text"
          value={state.vendorName}
          onChange={onChange}
        />
      </label>
      <br />
      <label htmlFor="csvFile">
        CSV File:
        <input name="csvFile" type="file" ref={fileInputRef} />
      </label>
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
