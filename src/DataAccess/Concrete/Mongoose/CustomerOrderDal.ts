import ICustomerOrder from "../../../Entities/Abstract/ICustomerOrder";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";
import ICustomerOrderDal from "../../Abstract/ICustomerOrderDal";
import { CustomerOrder } from "../../../Entities/Concrete/CustomerOrder";
import { injectable } from "tsyringe";

@injectable()
export default class CustomerOrderDal extends EntityRepositoryBase<ICustomerOrder> implements ICustomerOrderDal {
  constructor() {
    super(CustomerOrder);
  }
}
