import mongoose, { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";

export interface IOrder extends IModel, Document {
  status: string;
  orderDate: Date;
  totalPrice?: number;
  notes?: string;
  products: {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
}
