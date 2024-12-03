import { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";
import IBillOfMaterials from "./IBillOffMaterials";

export default interface IProduct extends IModel, Document {
  name: string;
  description: string;
  billOfMaterials: IBillOfMaterials[];
}
