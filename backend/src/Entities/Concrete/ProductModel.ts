import mongoose, { Schema } from "mongoose";
import IProductModel from "./../Abstract/IProductModel";

const productSchema = new Schema<IProductModel>(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    billOfMaterials: [
      {
        material: { type: Schema.Types.ObjectId, ref: "Material" },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProductModel>("Product", productSchema);

