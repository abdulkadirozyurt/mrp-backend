import { inject, injectable } from "tsyringe";
import IWarehouseService from "../Abstract/IWarehouseService";
import IWarehouse from "../../Entities/Abstract/IWarehouse";
import TYPES from "../../Api/IoC/ContainerTypes";
import IWarehouseDal from "../../DataAccess/Abstract/IWarehouseDal";
import { FilterQuery } from "mongoose";

@injectable()
export default class WarehouseManager implements IWarehouseService {
  constructor(@inject(TYPES.IWarehouseDal) private readonly _warehouseDal: IWarehouseDal) {}

  async GetAll(filter?: FilterQuery<IWarehouse>, populateFields?: string[]): Promise<IWarehouse[]> {
    return this._warehouseDal.GetAll(filter, populateFields);
  }

  async GetById(id: string, populateFields?: string[]): Promise<IWarehouse | null> {
    return this._warehouseDal.GetById(id, populateFields);
  }

  async Create(warehouse: IWarehouse): Promise<IWarehouse> {
    return this._warehouseDal.Create(warehouse);
  }

  async Update(id: string, warehouse: IWarehouse): Promise<IWarehouse | null> {
    return this._warehouseDal.Update(id, warehouse);
  }

  async Delete(id: string): Promise<void> {
    await this._warehouseDal.Delete(id);
  }
}
