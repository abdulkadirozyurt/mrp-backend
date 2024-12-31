import { FilterQuery } from "mongoose";
import { IOrder } from "../../Entities/Abstract/IOrder";

export default interface IOrderService {
  GetAll(filter?: FilterQuery<IOrder>, populateFields?: string[]): Promise<IOrder[]>;
  GetById(id: string, populateFields?: string[]): Promise<IOrder | null>;
  Create(order: IOrder): Promise<IOrder>;
  Update(id: string, order: Partial<IOrder>): Promise<IOrder | null>;
  Delete(id: string): Promise<void>;
}
