import mongoose, { Schema } from "mongoose";
import { IOrder } from "../Abstract/IOrder";
import { OrderStatusTypes } from "../../Utilities/Enums/Order/orderEnums";

const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatusTypes),
      default: OrderStatusTypes.PENDING,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
