import { Schema } from "mongoose";
import mongoose from "mongoose";
import ISupplierOrder from "../Abstract/ISupplierOrder";
import { Order } from "./Order";

const supplierOrderSchema = new Schema<ISupplierOrder>({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
  purchaseOrderNumber: { type: String, required: false },
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
  quantity: { type: Number, required: true },
  // materials: [
  //   {
  //     materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
  //     quantity: { type: Number, required: true },
  //   },
  // ],
});

export const SupplierOrder = Order.discriminator<ISupplierOrder>("SupplierOrder", supplierOrderSchema);
