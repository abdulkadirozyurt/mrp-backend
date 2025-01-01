import mongoose, { Schema } from "mongoose";
import { IOrder } from "../Abstract/IOrder";
import { OrderStatus } from "../../Utilities/Enums/Order/orderEnums";

const orderSchema = new Schema<IOrder>(
  {
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: false },
    notes: { type: String, required: false },
    deliveryDate: { type: Date, required: false },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true, discriminatorKey: "type" }
);

orderSchema.path("deliveryDate").validate(function (value: Date) {
  return value >= new Date();
}, "Delivery date cannot be in the past.");


export const Order = mongoose.model<IOrder>("Order", orderSchema);
