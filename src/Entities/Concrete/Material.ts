import mongoose, { Schema } from "mongoose";

import { MaterialEntryTypes, MaterialUnitTypes } from "../../Utilities/Enums/Material/materialEnums";
import IMaterial from "../Abstract/IMaterial";

const materialSchema = new Schema<IMaterial>(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    stockAmount: { type: Number, default: 0 },
    unitType: {
      type: String,
      required: true,
      lowercase: true,
      enum: Object.values(MaterialUnitTypes),
    },
    reorderLevel: { type: Number, default: 0 },
    price: { type: Number },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: false }],
    entryType: {
      type: String,
      enum: Object.values(MaterialEntryTypes),
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Material = mongoose.model<IMaterial>("Material", materialSchema);
