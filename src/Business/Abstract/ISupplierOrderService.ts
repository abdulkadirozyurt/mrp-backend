import { FilterQuery } from "mongoose";
import ISupplierOrder from "../../Entities/Abstract/ISupplierOrder";

export default interface ISupplierOrderService {
  GetAll(filter?: FilterQuery<ISupplierOrder>, populateFields?: string[]): Promise<ISupplierOrder[]>;
  GetById(id: string, populateFields?: string[]): Promise<ISupplierOrder | null>;
  Create(order: ISupplierOrder): Promise<ISupplierOrder>;
  Update(id: string, order: Partial<ISupplierOrder>): Promise<ISupplierOrder | null>;
  Delete(id: string): Promise<void>;
}
