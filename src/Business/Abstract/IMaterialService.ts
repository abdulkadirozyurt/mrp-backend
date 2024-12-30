import { FilterQuery } from "mongoose";
import IMaterial from "../../Entities/Abstract/IMaterial";
import { MaterialMovementTypes } from "../../Utilities/Enums/Material/materialEnums";


export default interface IMaterialService {
  GetAll(filter?: FilterQuery<IMaterial>, populateFields?: string[]): Promise<IMaterial[]>;
  GetById(id: string, populateFields?: string[]): Promise<IMaterial | null>;
  Create(product: IMaterial): Promise<IMaterial>;
  Update(id: string, material: Partial<IMaterial>): Promise<IMaterial | null>;
  Delete(id: string): Promise<any>;
  UpdateStock(id: string, quantity: number, movementType: MaterialMovementTypes): Promise<IMaterial | null>;
  TransferStock(sourceMaterialId: string, targetMaterialId: string, quantity: number): Promise<void>;
}
