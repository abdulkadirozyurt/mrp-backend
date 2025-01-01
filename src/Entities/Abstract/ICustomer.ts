import { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";

export default interface ICustomer extends IModel, Document {
  companyName: string;
  contactName: string;
  contactTitle?: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  postalCode?: string;
  region?: string;
  taxNumber?: string;
}
