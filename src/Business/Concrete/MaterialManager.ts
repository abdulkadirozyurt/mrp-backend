import { inject, injectable } from "tsyringe";
import IMaterialDal from "../../DataAccess/Abstract/IMaterialDal";
import IMaterial from "../../Entities/Abstract/IMaterial";
import IMaterialService from "../Abstract/IMaterialService";
import TYPES from "../../Api/IoC/Types";

@injectable()
export default class MaterialManager implements IMaterialService {
  constructor(
    @inject(TYPES.IMaterialDal)
    private readonly _materialDal: IMaterialDal
  ) {}

  public async GetAll(): Promise<IMaterial[]> {
    return await this._materialDal.GetAll();
  }

  public async GetById(id: string): Promise<IMaterial | null> {
    return await this._materialDal.GetById(id);
  }

  public async Create(material: IMaterial): Promise<IMaterial> {
    return await this._materialDal.Create(material);
  }

  public async Update(id: string, material: Partial<IMaterial>): Promise<IMaterial | null> {
    return await this._materialDal.Update(id, material);
  }

  public async Delete(id: string): Promise<void> {
    await this._materialDal.Delete(id);
  }
}
