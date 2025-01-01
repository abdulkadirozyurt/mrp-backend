import { FilterQuery } from "mongoose";
import ICustomer from "../../Entities/Abstract/ICustomer";

export default interface ICustomerService {
  GetAll(filter?: FilterQuery<ICustomer>, populateFields?: string[]): Promise<ICustomer[]>;
  GetById(id: string, populateFields?: string[]): Promise<ICustomer | null>;
  Create(customer: ICustomer): Promise<ICustomer>;
  Update(id: string, customer: Partial<ICustomer>): Promise<ICustomer | null>;
  Delete(id: string): Promise<void>;
}
