import mongoose, { Schema } from "mongoose";
import IProduct from "../Abstract/IProduct";

const unitTypes = ["adet", "kg", "litre", "balya"];

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    unitType: { type: String, required: true, lowercase: true, enum: unitTypes },
    billOfMaterials: [
      {
        material: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
