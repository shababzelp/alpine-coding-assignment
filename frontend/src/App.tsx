import { useState, useEffect } from "react";
import api from "./utils/api";
import { Form } from "./components/Form";
import styles from "./App.module.css";
import { PurchaseOrders } from "./components/PurchaseOrders";
function App() {
  const [isShowPurchaseOrder, setIsShowPurchaseOrder] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);

  const fetchPurchaseOrders = async () => {
    let result: any = [];
    const res = await api.get("/purchaseOrder");
    const obj = res.data;
    for (const key of Object.keys(obj)) {
      result = [...result, ...obj[key]];
    }
    setPurchaseOrders(result);
  };
  useEffect(() => {
    fetchPurchaseOrders();
  }, [isShowPurchaseOrder]);
  return (
    <>
      <header className={styles.header}>
        <h2>Insert Purchase Order</h2>
      </header>
      {isShowPurchaseOrder ? (
        <PurchaseOrders purchaseOrders={purchaseOrders} />
      ) : (
        <Form />
      )}
      <button
        onClick={() => {
          setIsShowPurchaseOrder((prev) => !prev);
        }}>
        Show {isShowPurchaseOrder ? "Form" : "Purchase Order"}
      </button>
    </>
  );
}

export default App;
