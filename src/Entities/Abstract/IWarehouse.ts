// src/Entities/Abstract/IWarehouse.ts
import mongoose from "mongoose";

export default interface IWarehouse {
  name: string;
  location?: string;
  capacity?: number;
  managerId?: mongoose.Schema.Types.ObjectId;
}
