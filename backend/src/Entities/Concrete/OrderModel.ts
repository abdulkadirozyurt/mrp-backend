import { Schema } from "mongoose";

const statusTypes = ["pending", "completed", "cancelled"];

const orderSchema = new Schema(
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
