import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import IProduct from "../../Entities/Abstract/IProduct";

export default interface IProductDal extends IEntityRepository<IProduct> {}
