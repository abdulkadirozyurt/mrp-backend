import ISupplierDal from "../../Abstract/ISupplierDal";
import ISupplier from "../../../Entities/Abstract/ISupplier";
import { Supplier } from "../../../Entities/Concrete/Supplier";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";
import { injectable } from "tsyringe";

@injectable()
export default class SupplierDal extends EntityRepositoryBase<ISupplier> implements ISupplierDal {
  constructor() {
    super(Supplier);
  }
}
