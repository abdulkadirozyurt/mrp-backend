import mongoose, { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";

export default interface IBillOfMaterials extends IModel, Document {
  materialId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  childComponents?: Array<IBillOfMaterials>;
}
