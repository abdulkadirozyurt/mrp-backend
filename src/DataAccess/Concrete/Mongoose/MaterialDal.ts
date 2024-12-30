import { injectable } from "tsyringe";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";
import IMaterial from "../../../Entities/Abstract/IMaterial";
import { Material } from "../../../Entities/Concrete/Material";
import IMaterialDal from "../../Abstract/IMaterialDal";
import { MovementType } from "../../../Utilities/Enums/Material/movementTypes";

@injectable()
export default class MaterialDal extends EntityRepositoryBase<IMaterial> implements IMaterialDal {
  constructor() {
    super(Material);
  }

  async UpdateStock(id: string, quantity: number, movementType: MovementType): Promise<IMaterial | null> {
    const material = await this.GetById(id);
    if (!material) {
      throw new Error("Material not found");
    }

    if (movementType === MovementType.IN) {
      material.stockAmount += quantity;
    } else if (movementType === MovementType.OUT) {
      if (material.stockAmount < quantity) {
        throw new Error("Insufficient stock");
      }
      material.stockAmount -= quantity;
    }
    await this.Update(id, material);
    return material;
  }
}
