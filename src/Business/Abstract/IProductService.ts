import { FilterQuery } from "mongoose";
import IProduct from "../../Entities/Abstract/IProduct";

export default interface IProductService {
  GetAll(): Promise<IProduct[]>;
  GetById(id: string): Promise<IProduct | null>;
  Create(product: IProduct): Promise<IProduct>;
  Update(id: string, product: Partial<IProduct>): Promise<IProduct | null>;
  Delete(id: string): Promise<void>;
}
