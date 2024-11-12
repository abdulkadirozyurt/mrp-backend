import { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";
import IBillOfMaterialsModel from "./IBillOffMaterialsModel";

export default interface IProductModel extends IModel {
  name: string;
  description: string;
  billOfMaterials: IBillOfMaterialsModel[];
}
