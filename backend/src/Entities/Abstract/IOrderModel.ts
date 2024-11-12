import IModel from "../../Core/Entities/Abstract/IModel";
import IProductModel from "./IProductModel";

export interface IOrderModel extends IModel {
  status: string;
  products: IProductModel[];
}
