import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import ICustomerOrder from "../../Entities/Abstract/ICustomerOrder";

export default interface ICustomerOrderDal extends IEntityRepository<ICustomerOrder> {}
