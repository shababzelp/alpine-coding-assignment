import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import purchaseOrderRoutes from "./routes/purchaseOrder";

(async () => {
  try {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload());
    app.use("/api/purchaseOrder", purchaseOrderRoutes);
    app.listen(4000, () => {
      console.log("server listening on port 4000");
    });
  } catch (err) {
    console.error(err);
  }
})();
