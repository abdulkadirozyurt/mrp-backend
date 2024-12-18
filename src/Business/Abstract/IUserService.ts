import { FilterQuery } from "mongoose";
import IUser from "../../Entities/Abstract/IUser";

export default interface IUserService {
  GetAll(filter?: FilterQuery<IUser>, populateFields?: string): Promise<IUser[]>;
  GetById(id: string, populateFields?: string): Promise<IUser | null>;
  Create(user: IUser): Promise<IUser>;
  Update(id: string, user: IUser): Promise<IUser | null>;
  Delete(id: string): Promise<any>;
}
