import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import IMaterial from "../../Entities/Abstract/IMaterial";
import { MaterialMovementTypes } from "../../Utilities/Enums/Material/materialEnums";

export default interface IMaterialDal extends IEntityRepository<IMaterial> {
  UpdateStock(id: string, quantity: number, movementType: MaterialMovementTypes): Promise<IMaterial | null>;
}
