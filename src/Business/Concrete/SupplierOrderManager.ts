import { inject, injectable } from "tsyringe";
import ISupplierOrderService from "../Abstract/ISupplierOrderService";
import ISupplierOrder from "../../Entities/Abstract/ISupplierOrder";
import ContainerTypes from "../../Api/IoC/ContainerTypes";
import ISupplierOrderDal from "../../DataAccess/Abstract/ISupplierOrderDal";
import { FilterQuery } from "mongoose";

@injectable()
export default class SupplierOrderManager implements ISupplierOrderService {
  constructor(
    @inject(ContainerTypes.ISupplierOrderDal) private readonly _supplierOrderDal: ISupplierOrderDal
  ) {}

  public async GetAll(filter?: FilterQuery<ISupplierOrder>, populateFields?: string[]): Promise<ISupplierOrder[]> {
    return await this._supplierOrderDal.GetAll(filter, populateFields);
  }

  public async GetById(id: string, populateFields?: string[]): Promise<ISupplierOrder | null> {
    return await this._supplierOrderDal.GetById(id, populateFields);
  }

  public async Create(order: ISupplierOrder): Promise<ISupplierOrder> {
    return await this._supplierOrderDal.Create(order);
  }

  public async Update(id: string, order: Partial<ISupplierOrder>): Promise<ISupplierOrder | null> {
    return await this._supplierOrderDal.Update(id, order);
  }

  public async Delete(id: string): Promise<void> {
    await this._supplierOrderDal.Delete(id);
  }
}
