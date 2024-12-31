import mongoose, { Schema } from "mongoose";
import ICustomer from "../Abstract/ICustomer";

const customerSchema = new Schema<ICustomer>(
  {
    companyName: { type: String, required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    taxNumber: { type: String, required: false },
  },
  { timestamps: true }
);

export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
