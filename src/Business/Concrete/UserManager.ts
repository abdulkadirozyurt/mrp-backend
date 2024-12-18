import { inject, injectable } from "tsyringe";
import IUser from "../../Entities/Abstract/IUser";
import IUserService from "../Abstract/IUserService";
import TYPES from "../../Api/IoC/Types";
import IUserDal from "../../DataAccess/Abstract/IUserDal";
import { FilterQuery } from "mongoose";

@injectable()
export default class UserManager implements IUserService {
  constructor(@inject(TYPES.IUserDal) private readonly _userDal: IUserDal) {}

  public async GetAll(filter?: FilterQuery<IUser>, populateFields?: string[]): Promise<IUser[]> {
    return await this._userDal.GetAll(filter, populateFields);
  }
  public async GetById(id: string, populateFields?: string[]): Promise<IUser | null> {
    return await this._userDal.GetById(id, populateFields);
  }
  public async Create(user: IUser): Promise<IUser> {
    return await this._userDal.Create(user);
  }
  public async Update(id: string, user: IUser): Promise<IUser | null> {
    return await this._userDal.Update(id, user);
  }
  public async Delete(id: string): Promise<any> {
    return await this._userDal.Delete(id);
  }
}
