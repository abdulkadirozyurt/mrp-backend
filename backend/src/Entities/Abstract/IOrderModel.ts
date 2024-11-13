import IModel from "../../Core/Entities/Abstract/IModel";
import IProductModel from "./IProductModel";

export interface IOrderModel extends IModel,Document {
  status: string;
  products: {
    product: IProductModel;
    quantity: number;
  }[];
}
