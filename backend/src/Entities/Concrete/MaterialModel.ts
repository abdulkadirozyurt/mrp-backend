import mongoose, { Schema } from "mongoose";
import IMaterialModel from "../Abstract/IMaterialModel";

const unitTypes = ["adet", "kg", "litre"];

const materialSchema = new Schema<IMaterialModel>(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    stockAmount: { type: Number, default: 0 },
    unitType: { type: String, required: true, lowercase: true, enum: unitTypes }, // Birim (adet, kg, litre gibi)
  },
  { timestamps: true }
);

export const Material = mongoose.model<IMaterialModel>("Material", materialSchema);
