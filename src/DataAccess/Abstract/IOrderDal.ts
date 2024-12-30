import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import { IOrder } from "../../Entities/Abstract/IOrder";

export default interface IOrderDal extends IEntityRepository<IOrder> {}
