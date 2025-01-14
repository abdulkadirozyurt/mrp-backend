import { injectable } from "tsyringe";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";
import IWarehouse from "../../../Entities/Abstract/IWarehouse";
import { Warehouse } from "../../../Entities/Concrete/Warehouse";
import IWarehouseDal from "../../Abstract/IWarehouseDal";

@injectable()
export default class WarehouseDal extends EntityRepositoryBase<IWarehouse> implements IWarehouseDal {
  constructor() {
    super(Warehouse);
  }
}
