import mongoose, { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";
import { MovementType } from "../../Utilities/Enums/Material/movementTypes";

export default interface IInventoryMovement extends IModel, Document {
  materialId: mongoose.Schema.Types.ObjectId;
  movementType: MovementType;
  quantity: number;
  date: Date;
  description: string;
  userId: mongoose.Schema.Types.ObjectId;
}
