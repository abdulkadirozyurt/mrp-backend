import mongoose, { mongo, Schema } from "mongoose";
import { IOrderModel } from "../Abstract/IOrderModel";

const statusTypes = ["pending", "completed", "cancelled"];

const orderSchema = new Schema<IOrderModel>(
  {
    status: { type: String, required: true, enum: statusTypes, default: "pending" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrderModel>("Order", orderSchema);
