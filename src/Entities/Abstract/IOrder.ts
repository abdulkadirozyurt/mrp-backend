import { Document } from "mongoose";
import IModel from "../../Core/Entities/Abstract/IModel";
import IProduct from "./IProduct";

export interface IOrder extends IModel, Document {
  status: string;
  products: {
    product: IProduct;
    quantity: number;
  }[];
}
