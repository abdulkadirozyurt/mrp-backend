import { inject, injectable } from "tsyringe";
import ICustomerOrderService from "../Abstract/ICustomerOrderService";
import ICustomerOrder from "../../Entities/Abstract/ICustomerOrder";
import ContainerTypes from "../../Api/IoC/ContainerTypes";
import ICustomerOrderDal from "../../DataAccess/Abstract/ICustomerOrderDal";
import { FilterQuery } from "mongoose";

@injectable()
export default class CustomerOrderManager implements ICustomerOrderService {
  constructor(
    @inject(ContainerTypes.ICustomerOrderDal) private readonly _customerOrderDal: ICustomerOrderDal
  ) {}

  public async GetAll(filter?: FilterQuery<ICustomerOrder>, populateFields?: string[]): Promise<ICustomerOrder[]> {
    return await this._customerOrderDal.GetAll(filter, populateFields);
  }

  public async GetById(id: string, populateFields?: string[]): Promise<ICustomerOrder | null> {
    return await this._customerOrderDal.GetById(id, populateFields);
  }

  public async Create(order: ICustomerOrder): Promise<ICustomerOrder> {
    return await this._customerOrderDal.Create(order);
  }

  public async Update(id: string, order: Partial<ICustomerOrder>): Promise<ICustomerOrder | null> {
    return await this._customerOrderDal.Update(id, order);
  }

  public async Delete(id: string): Promise<void> {
    await this._customerOrderDal.Delete(id);
  }
}
