import IModel from "../../Core/Entities/Abstract/IModel";
import IProductDal from "../../DataAccess/Abstract/IProductDal";
import IProductService from "../Abstract/IProductService";

export default class ProductManager implements IProductService {
  private readonly _productDal: IProductDal;

  constructor(productDal: IProductDal) {
    this._productDal = productDal;
  }

  GetAll(): Promise<any> {
    return this._productDal.GetAll();
  }
  GetById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  Create(product: IModel): Promise<any> {
    throw new Error("Method not implemented.");
  }
  Update(id: string, product: IModel): Promise<any> {
    throw new Error("Method not implemented.");
  }
  Delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
