import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import IUser from "../../Entities/Abstract/IUser";

export default interface IUserDal extends IEntityRepository<IUser> {
    FindByEmail(email:string):Promise<IUser|null>;
}
