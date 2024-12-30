import mongoose, { Document } from "mongoose";
import { EntryType } from "perf_hooks";
import IModel from "../../Core/Entities/Abstract/IModel";
import { MaterialEntryTypes, MaterialUnitTypes } from "../../Utilities/Enums/Material/materialEnums";

export default interface IMaterial extends IModel, Document {
  name: string;
  stockAmount: number;
  unitType: MaterialUnitTypes;
  price: number;
  reorderLevel: number;
  priceHistory: Array<{ price: number; date: Date }>;
  suppliers: mongoose.Schema.Types.ObjectId[];
  entryType: MaterialEntryTypes;
}
