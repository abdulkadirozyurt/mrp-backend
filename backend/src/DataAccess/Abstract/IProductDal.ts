import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import IModel from "../../Core/Entities/Abstract/IModel";
import IProductModel from "../../Entities/Abstract/IProductModel";
import { Product } from "./../../Entities/Concrete/ProductModel";

export default interface IProductDal extends IEntityRepository<IProductModel> {}
