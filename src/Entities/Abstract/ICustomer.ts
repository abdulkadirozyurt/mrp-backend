import IModel from "../../Core/Entities/Abstract/IModel";

export default interface ICustomer extends IModel, Document {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    taxNumber?: string; // Opsiyonel alan
  }