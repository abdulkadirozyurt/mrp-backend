import { injectable } from "tsyringe";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";
import IMaterial from "../../../Entities/Abstract/IMaterial";
import { Material } from "../../../Entities/Concrete/Material";
import IMaterialDal from "../../Abstract/IMaterialDal";

@injectable()
export default class MaterialDal extends EntityRepositoryBase<IMaterial> implements IMaterialDal {
  constructor() {
    super(Material);
  }
}
