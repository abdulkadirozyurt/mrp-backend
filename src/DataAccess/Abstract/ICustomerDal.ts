import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import ICustomer from "../../Entities/Abstract/ICustomer";

export default interface ICustomerDal extends IEntityRepository<ICustomer> {}
