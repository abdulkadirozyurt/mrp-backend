import mongoose, { Schema } from "mongoose";
import IInventoryMovement from "../Abstract/IInventoryMovement";
import { MovementType } from "../../Utilities/Enums/Material/movementTypes";

const inventoryMovementSchema = new Schema<IInventoryMovement>({
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
  movementType: { type: String, enum: MovementType, required: true, lowercase: true },
  quantity: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const InventoryMovement = mongoose.model<IInventoryMovement>(
  "InventoryMovement",
  inventoryMovementSchema
);
