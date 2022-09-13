import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { isCSVFile } from "../utils/isCSVFile";
import api from "../utils/api";
import styles from "./Form.module.css";
export const Form = () => {
  const [error, setError] = useState<undefined | string>(undefined);
  const [msg, setMsg] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);
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
    e.preventDefault();
    if (!state.vendorName.trim().length) {
      setError("Vendor name is required");
      return;
    }
    let file: File | null = null;
    if (fileInputRef.current?.files && fileInputRef.current?.files[0]) {
      file = fileInputRef.current?.files[0];
    }
    if (!file) {
      setError("No file uploaded");
      return;
    }
    const isValidFilename = isCSVFile(file);
    if (!isValidFilename) {
      setError("Invalid file");
      return;
    }
    const formData = new FormData();
    formData.append("csvFile", file);
    formData.append("vendor", JSON.stringify(state));

    try {
      setIsLoading(true);
      const res = await api.post("/purchaseOrder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setMsg("File successfully uploaded!");
        setError(undefined);
        setIsLoading(false);
        setState({
          vendorName: "",
          date: new Date(),
        });
      } else {
        setError("Something went wrong");
        setIsLoading(false);
        setMsg(undefined);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong! Unable to upload file"
      );
      setIsLoading(false);
      setMsg(undefined);
    }
  };

  return (
    <div className={styles["text-center"]}>
      {msg && <p className={styles.success}>{msg}</p>}
      {error && <p className={styles.error}>{error}</p>}
      {isLoading && <p>loading..</p>}
      <form onSubmit={onSubmit}>
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
            required
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
    </div>
  );
};
