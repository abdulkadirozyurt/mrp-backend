import IUser from "../../Entities/Abstract/IUser";

export default interface IUserService {
  GetAll(): Promise<IUser[]>;
  GetById(id: string): Promise<IUser | null>;
  Create(user: IUser): Promise<IUser>;
  Update(id: string, user: IUser): Promise<IUser | null>;
  Delete(id: string): Promise<any>;
}
