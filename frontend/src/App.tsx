import { Form } from "./components/Form";
import styles from "./App.module.css";
function App() {
  return (
    <>
      <header className={styles.header}>
        <h2>Insert Purchase Order</h2>
      </header>
      <Form />
    </>
  );
}

export default App;
