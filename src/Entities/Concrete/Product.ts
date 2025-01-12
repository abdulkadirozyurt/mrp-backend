import mongoose, { Schema } from "mongoose";
import IProduct from "../Abstract/IProduct";
import { ProductUnitTypes } from "../../Utilities/Enums/Product/productEnums";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    unitType: { type: String, required: true, lowercase: true, enum: Object.values(ProductUnitTypes) },
    billOfMaterials: [
      {
        materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
