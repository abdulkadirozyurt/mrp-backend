import ISupplierOrder from "../../../Entities/Abstract/ISupplierOrder";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";
import ISupplierOrderDal from "../../Abstract/ISupplierOrderDal";
import { injectable } from "tsyringe";
import { SupplierOrder } from "../../../Entities/Concrete/SupplierOrder ";

@injectable()
export default class SupplierOrderDal extends EntityRepositoryBase<ISupplierOrder> implements ISupplierOrderDal {
  constructor() {
    super(SupplierOrder);
  }
}
