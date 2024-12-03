import { inject, injectable } from "tsyringe";
import IProductDal from "../../DataAccess/Abstract/IProductDal";
import IProduct from "../../Entities/Abstract/IProduct";
import IProductService from "../Abstract/IProductService";

@injectable()
export default class ProductManager implements IProductService {
  private readonly _productDal: IProductDal;

  constructor(@inject("IProductDal") productDal: IProductDal) {
    this._productDal = productDal;
  }

  GetAll(): Promise<any> {
    return this._productDal.GetAll({}, ["billOfMaterials.material"]);
  }
  GetById(id: string): Promise<any> {
    return this._productDal.GetById(id, ["billOfMaterials.material"]);
  }
  Create(product: IProduct): Promise<any> {
    return this._productDal.Create(product);
  }
  Update(id: string, product: IProduct): Promise<any> {
    return this._productDal.Update(id, product);
  }
  Delete(id: string): Promise<any> {
    return this._productDal.Delete(id);
  }
}
