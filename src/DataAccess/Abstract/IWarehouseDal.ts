import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import IWarehouse from "../../Entities/Abstract/IWarehouse";

export default interface IWarehouseDal extends IEntityRepository<IWarehouse> {}
