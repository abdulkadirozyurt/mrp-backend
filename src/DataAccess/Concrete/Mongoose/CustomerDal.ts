import { injectable } from "tsyringe";
import ICustomerDal from "../../Abstract/ICustomerDal";
import ICustomer from "../../../Entities/Abstract/ICustomer";
import { Customer } from "../../../Entities/Concrete/Customer";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";

@injectable()
export default class CustomerDal extends EntityRepositoryBase<ICustomer> implements ICustomerDal {
  constructor() {
    super(Customer);
  }
}
