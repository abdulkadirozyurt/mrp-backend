import { User } from "./../../Entities/Concrete/User";
import { inject, injectable } from "tsyringe";
import TYPES from "../../Api/IoC/ContainerTypes";
import IUserDal from "../../DataAccess/Abstract/IUserDal";
import IUser from "../../Entities/Abstract/IUser";

export default interface IAuthService {
  Login(email: string, password: string): Promise<string>;
  Register(user: { firstname: string; lastname: string; email: string; password: string}): Promise<string>;
}
