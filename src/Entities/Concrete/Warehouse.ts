// src/Entities/Concrete/Warehouse.ts
import mongoose, { Schema } from "mongoose";
import IWarehouse from "../Abstract/IWarehouse";

const warehouseSchema = new Schema<IWarehouse>(
  {
    name: { type: String, required: true, unique: true },
    location: { type: String },
    capacity: { type: Number },
    description: { type: String },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Warehouse = mongoose.model<IWarehouse>("Warehouse", warehouseSchema);
