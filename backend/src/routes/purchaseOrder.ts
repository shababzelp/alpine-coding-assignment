import express from "express";
import purchaseOrderController from "../controller/purchaseOrder";

const router = express.Router();

router.post("/", purchaseOrderController.createPurchaseOrder);

export default router;
