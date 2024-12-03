import mongoose, { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";


export default interface IBillOfMaterials extends IModel, Document {
  material: mongoose.Types.ObjectId;
  quantity: number;
}
