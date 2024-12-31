import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import ISupplierOrder from "../../Entities/Abstract/ISupplierOrder";

export default interface ISupplierOrderDal extends IEntityRepository<ISupplierOrder> {}
