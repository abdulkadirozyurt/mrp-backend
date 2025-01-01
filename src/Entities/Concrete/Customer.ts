import mongoose, { Schema } from "mongoose";
import ICustomer from "../Abstract/ICustomer";

const customerSchema = new Schema<ICustomer>(
  {
    companyName: { type: String, required: true },
    contactName: { type: String, required: true },
    contactTitle: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    taxNumber: { type: String, required: false },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: false },
    region: { type: String, required: false },

  },
  { timestamps: true }
);

export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
