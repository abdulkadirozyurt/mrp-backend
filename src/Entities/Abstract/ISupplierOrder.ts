import mongoose from "mongoose";
import { IOrder } from "./IOrder";

export default interface ISupplierOrder extends IOrder {
  supplierId: mongoose.Schema.Types.ObjectId;
  warehouseId: mongoose.Schema.Types.ObjectId;
  purchaseOrderNumber?: string;
  materialId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  // materials: {
  //   materialId: mongoose.Schema.Types.ObjectId;
  //   quantity: number;
  // }[];
}
