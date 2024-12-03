import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import IMaterial from "../../Entities/Abstract/IMaterial";

export default interface IMaterialDal extends IEntityRepository<IMaterial> {}
