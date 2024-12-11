import e from "cors";
import IMaterial from "./IMaterial";
import IModel from "../../Core/Entities/Abstract/IModel";
import { Document } from "mongoose";

export default interface ISupplier extends IModel, Document {
  name: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  materialsOfSupplied: IMaterial[];
}
