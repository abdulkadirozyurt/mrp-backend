import mongoose, { Schema } from "mongoose";
import IMaterial from "../Abstract/IMaterial";
import ISupplier from "./../Abstract/ISupplier";

const unitTypes = ["adet", "kg", "litre"];

const materialSchema = new Schema<IMaterial>(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    stockAmount: { type: Number, default: 0 },
    unitType: { type: String, required: true, lowercase: true, enum: unitTypes }, // Birim (adet, kg, litre gibi)
    suppliers: { type: Array<ISupplier>(), required: true },
    reorderLevel: { type: Number, default: 0 },
    price: { type: Number },
    priceHistory:[
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export const Material = mongoose.model<IMaterial>("Material", materialSchema);
