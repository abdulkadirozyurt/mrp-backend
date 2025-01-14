// src/Entities/Abstract/IWarehouse.ts
import mongoose, { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";

export default interface IWarehouse extends IModel, Document {
  name: string;
  location?: string;
  capacity?: number;
  description?: string;
  managerId?: mongoose.Schema.Types.ObjectId;
}
