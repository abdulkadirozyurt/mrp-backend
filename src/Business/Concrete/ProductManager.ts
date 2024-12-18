import TYPES from "../../Api/IoC/Types";
import { inject, injectable } from "tsyringe";
import IProduct from "../../Entities/Abstract/IProduct";
import IProductService from "../Abstract/IProductService";
import IProductDal from "../../DataAccess/Abstract/IProductDal";
import { FilterQuery } from "mongoose";

@injectable()
export default class ProductManager implements IProductService {
  private readonly _productDal: IProductDal;

  constructor(@inject(TYPES.IProductDal) productDal: IProductDal) {
    this._productDal = productDal;
  }

  public async GetAll(
    filter?: FilterQuery<IProduct>,
    populateFields?: string[]
  ): Promise<IProduct[]> {
    // return this._productDal.GetAll({}, ["billOfMaterials.materialId"]);
    return this._productDal.GetAll(filter, populateFields);
  }

  public async GetById(id: string, populateFields?: string[]): Promise<IProduct | null> {
    // return this._productDal.GetById(id, ["billOfMaterials.materialId"]);
    return this._productDal.GetById(id, populateFields);
  }
  public async Create(product: IProduct): Promise<IProduct> {
    return this._productDal.Create(product);
  }
  public async Update(id: string, product: IProduct): Promise<IProduct | null> {
    return this._productDal.Update(id, product);
  }
  public async Delete(id: string): Promise<void> {
    return this._productDal.Delete(id);
  }
}
