import mongoose, { Schema } from "mongoose";
import { Order } from "./Order";
import ICustomerOrder from "../Abstract/ICustomerOrder";

const customerOrderSchema = new Schema<ICustomerOrder>({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, required: false },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export const CustomerOrder = Order.discriminator<ICustomerOrder>("CustomerOrder", customerOrderSchema);
