import mongoose, { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";
import { MaterialMovementTypes } from "../../Utilities/Enums/Material/materialEnums";

export default interface IInventoryMovement extends IModel, Document {
  materialId: mongoose.Schema.Types.ObjectId;
  movementType: MaterialMovementTypes;
  quantity: number;
  date: Date;
  description: string;
  userId: mongoose.Schema.Types.ObjectId;
}
