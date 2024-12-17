import mongoose, { Schema } from "mongoose";
import { IOrder } from "../Abstract/IOrder";

const statusTypes = ["pending", "completed", "cancelled"];

const orderSchema = new Schema<IOrder>(
  {
    status: { type: String, required: true, enum: statusTypes, default: "pending" },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
