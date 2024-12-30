import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import IMaterial from "../../Entities/Abstract/IMaterial";
import { MovementType } from "../../Utilities/Enums/Material/movementTypes";

export default interface IMaterialDal extends IEntityRepository<IMaterial> {
  UpdateStock(id: string, quantity: number, movementType: MovementType): Promise<IMaterial | null>;
}
