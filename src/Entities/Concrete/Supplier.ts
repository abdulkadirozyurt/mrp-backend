// Supplier.ts
import mongoose, { Schema } from "mongoose";
import ISupplier from "../Abstract/ISupplier";

const supplierSchema = new Schema<ISupplier>(
  {
    name: { type: String, required: true },
    contactName: String,
    contactTitle: String,
    address: String,
    city: String,
    country: String,
    phone: String,
    email: String,
    materialsOfSupplied: [{ type: mongoose.Types.ObjectId, ref: "Material" }],
  },
  { timestamps: true }
);

export const Supplier = mongoose.model<ISupplier>("Supplier", supplierSchema);
