import { injectable } from "tsyringe";
import IProduct from "../../../Entities/Abstract/IProduct";
import { Product } from "../../../Entities/Concrete/Product";
import IProductDal from "../../Abstract/IProductDal";
import EntityRepositoryBase from "./../../../Core/DataAccess/Concrete/EntityRepositoryBase";

@injectable()
export default class ProductDal extends EntityRepositoryBase<IProduct> implements IProductDal {
  constructor() {
    super(Product);
  }
}
