import mongoose, { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";
import ISupplier from "./ISupplier";

export default interface IMaterial extends IModel, Document {
  name: string;
  stockAmount: number;
  unitType: string;
  price: number;
  reorderLevel: number;
  priceHistory: Array<{ price: number; date: Date }>;
  suppliers: mongoose.Schema.Types.ObjectId[];
  entryType: string;
}
