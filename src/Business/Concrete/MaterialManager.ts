import { inject, injectable } from "tsyringe";
import IMaterialDal from "../../DataAccess/Abstract/IMaterialDal";
import IMaterial from "../../Entities/Abstract/IMaterial";
import IMaterialService from "../Abstract/IMaterialService";

@injectable()
export default class MaterialManager implements IMaterialService {
  private readonly _materialDal: IMaterialDal;

  constructor(@inject("IMaterialDal") materialDal: IMaterialDal) {
    this._materialDal = materialDal;
  }

  GetAll(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  GetById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  Create(product: IMaterial): Promise<any> {
    return this._materialDal.Create(product);
  }
  Update(id: string, product: IMaterial): Promise<any> {
    throw new Error("Method not implemented.");
  }
  Delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
