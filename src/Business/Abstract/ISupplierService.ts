import { FilterQuery } from "mongoose";
import ISupplier from "../../Entities/Abstract/ISupplier";

export default interface ISupplierService {
  GetAll(filter?: FilterQuery<ISupplier>, populateFields?: string[]): Promise<ISupplier[]>;
  GetById(id: string, populateFields?: string[]): Promise<ISupplier | null>;
  Create(product: ISupplier): Promise<ISupplier>;
  Update(id: string, product: ISupplier): Promise<ISupplier | null>;
  Delete(id: string): Promise<any>;
}
