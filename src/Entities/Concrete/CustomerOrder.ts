import mongoose, { Schema } from "mongoose";
import { Order } from "./Order";
import ICustomerOrder from "../Abstract/ICustomerOrder";

const customerOrderSchema = new Schema<ICustomerOrder>({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  deliveryAddress: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  paymentMethod: { type: String, required: false },
});

export const CustomerOrder = Order.discriminator<ICustomerOrder>("CustomerOrder", customerOrderSchema);
