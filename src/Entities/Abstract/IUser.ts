import { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";

export default interface IUser extends IModel, Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  department: string;
  position: string;
  address: string;
  phoneNumber: string;
  employeeCode: string;
}
