import { FilterQuery } from "mongoose";
import { IOrder } from "../../Entities/Abstract/IOrder";
import IOrderService from "../Abstract/IOrderService";
import { inject, injectable } from "tsyringe";
import ContainerTypes from "../../Api/IoC/ContainerTypes";
import IOrderDal from "../../DataAccess/Abstract/IOrderDal";

@injectable()
export default class OrderManager implements IOrderService {
  constructor(@inject(ContainerTypes.IOrderDal) private readonly _orderDal: IOrderDal) {}

  GetAll(filter?: FilterQuery<IOrder>, populateFields?: string[]): Promise<IOrder[]> {
    return this._orderDal.GetAll(filter, populateFields);
  }
  GetById(id: string, populateFields?: string[]): Promise<IOrder | null> {
    return this._orderDal.GetById(id, populateFields);
  }
  Create(order: IOrder): Promise<IOrder> {
    return this._orderDal.Create(order);
  }
  Update(id: string, order: Partial<IOrder>): Promise<IOrder | null> {
    return this._orderDal.Update(id, order);
  }
  Delete(id: string): Promise<void> {
    return this._orderDal.Delete(id);
  }
}
