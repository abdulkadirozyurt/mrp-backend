import mongoose from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";

export default interface IBillOfMaterialsModel extends IModel {
  material: mongoose.Types.ObjectId;
  quantity: number;
}
