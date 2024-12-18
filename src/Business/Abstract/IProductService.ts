import { FilterQuery } from "mongoose";
import IProduct from "../../Entities/Abstract/IProduct";

export default interface IProductService {
  GetAll(filter?: FilterQuery<IProduct>, populateFields?: string): Promise<IProduct[]>;
  GetById(id: string, populateFields?: string): Promise<IProduct | null>;
  Create(product: IProduct): Promise<IProduct>;
  Update(id: string, product: Partial<IProduct>): Promise<IProduct | null>;
  Delete(id: string): Promise<void>;
}
