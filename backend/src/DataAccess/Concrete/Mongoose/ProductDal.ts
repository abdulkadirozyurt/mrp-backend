import IProductDal from "../../Abstract/IProductDal";
import IProductModel from "../../../Entities/Abstract/IProductModel";
import EntityRepositoryBase from "./../../../Core/DataAccess/Concrete/EntityRepositoryBase";
import { Product } from "../../../Entities/Concrete/ProductModel";

export default class ProductDal extends EntityRepositoryBase<IProductModel> implements IProductDal {
  constructor() {
    super(Product);
  }
}
