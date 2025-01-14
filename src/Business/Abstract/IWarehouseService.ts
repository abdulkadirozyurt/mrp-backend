import IWarehouse from "../../Entities/Abstract/IWarehouse";
import { FilterQuery } from "mongoose";

export default interface IWarehouseService {
  GetAll(filter?: FilterQuery<IWarehouse>, populateFields?: string[]): Promise<IWarehouse[]>;
  GetById(id: string, populateFields?: string[]): Promise<IWarehouse | null>;
  Create(warehouse: IWarehouse): Promise<IWarehouse>;
  Update(id: string, warehouse: IWarehouse): Promise<IWarehouse | null>;
  Delete(id: string): Promise<void>;
}
