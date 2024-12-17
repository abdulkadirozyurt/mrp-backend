import mongoose, { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";

export default interface ISupplier extends IModel, Document {
  name: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  materialsOfSupplied: mongoose.Schema.Types.ObjectId[];
}
