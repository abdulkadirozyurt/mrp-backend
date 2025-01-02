import mongoose from "mongoose";
import { IOrder } from "./IOrder";

export default interface ICustomerOrder extends IOrder {
  customerId: mongoose.Schema.Types.ObjectId;
  deliveryAddress: string;
  paymentMethod?: string;
  products: {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
}
