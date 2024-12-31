import { IOrder } from "./../../../Entities/Abstract/IOrder";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";
import IOrderDal from "../../Abstract/IOrderDal";
import { Order } from "../../../Entities/Concrete/Order";
import { injectable } from "tsyringe";

@injectable()
export default class OrderDal extends EntityRepositoryBase<IOrder> implements IOrderDal {
  constructor() {
    super(Order);
  }
}
