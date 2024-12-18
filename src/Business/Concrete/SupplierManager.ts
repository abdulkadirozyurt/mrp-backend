import { FilterQuery } from "mongoose";
import ISupplier from "../../Entities/Abstract/ISupplier";
import ISupplierService from "../Abstract/ISupplierService";
import { inject, injectable } from "tsyringe";
import TYPES from "../../Api/IoC/Types";
import ISupplierDal from "../../DataAccess/Abstract/ISupplierDal";

@injectable()
export default class SupplierManager implements ISupplierService {
  constructor(@inject(TYPES.ISupplierDal) private readonly _supplierDal: ISupplierDal) {}

  async GetAll(filter?: FilterQuery<ISupplier>, populateFields?: string[]): Promise<ISupplier[]> {
    return await this._supplierDal.GetAll(filter, populateFields);
  }

  async GetById(id: string, populateFields?: string[]): Promise<ISupplier | null> {
    return await this._supplierDal.GetById(id, populateFields);
  }

  async Create(product: ISupplier): Promise<ISupplier> {
    return await this._supplierDal.Create(product);
  }

  async Update(id: string, product: ISupplier): Promise<ISupplier | null> {
    return await this._supplierDal.Update(id, product);
  }

  async Delete(id: string): Promise<any> {
    return await this._supplierDal.Delete(id);
  }
}
