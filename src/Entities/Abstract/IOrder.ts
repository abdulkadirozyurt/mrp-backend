import mongoose, { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";

export interface IOrder extends IModel, Document {
  companyName: string;
  status: string;
  orderDate: Date;
  totalPrice?: number;
  notes?: string;
  deliveryDate: Date;
}
