import mongoose from "mongoose";
import { IOrder } from "./IOrder";

export default interface ISupplierOrder extends IOrder {
  supplierId: mongoose.Types.ObjectId;
  warehouseId: mongoose.Types.ObjectId;
  purchaseOrderNumber?: string;
  materialId: mongoose.Types.ObjectId;
  quantity: number;
}
