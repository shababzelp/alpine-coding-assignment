import express from "express";
import purchaseOrderController from "../controller/purchaseOrder";

const router = express.Router();
router.get("/", purchaseOrderController.getPurchaseOrder);
router.post("/", purchaseOrderController.createPurchaseOrder);

export default router;
