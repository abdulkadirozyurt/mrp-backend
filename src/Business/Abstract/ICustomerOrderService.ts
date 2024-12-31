import { FilterQuery } from "mongoose";
import ICustomerOrder from "../../Entities/Abstract/ICustomerOrder";

export default interface ICustomerOrderService {
  GetAll(filter?: FilterQuery<ICustomerOrder>, populateFields?: string[]): Promise<ICustomerOrder[]>;
  GetById(id: string, populateFields?: string[]): Promise<ICustomerOrder | null>;
  Create(order: ICustomerOrder): Promise<ICustomerOrder>;
  Update(id: string, order: Partial<ICustomerOrder>): Promise<ICustomerOrder | null>;
  Delete(id: string): Promise<void>;
}
