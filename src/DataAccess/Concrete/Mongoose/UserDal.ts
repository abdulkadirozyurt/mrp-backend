import { injectable } from "tsyringe";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";
import IUser from "../../../Entities/Abstract/IUser";
import { User } from "../../../Entities/Concrete/User";
import IUserDal from "../../Abstract/IUserDal";

@injectable()
export default class UserDal
  extends EntityRepositoryBase<IUser>
  implements IUserDal
{
  constructor() {
    super(User);
  }

  public async FindByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
}
