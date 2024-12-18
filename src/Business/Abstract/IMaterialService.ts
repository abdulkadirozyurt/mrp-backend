import { FilterQuery } from "mongoose";
import IMaterial from "../../Entities/Abstract/IMaterial";

export default interface IMaterialService {
  GetAll(filter?: FilterQuery<IMaterial>, populateFields?: string): Promise<IMaterial[]>;
  GetById(id: string,populateFields?: string): Promise<IMaterial | null>;
  Create(product: IMaterial): Promise<IMaterial>;
  Update(id: string, product: IMaterial): Promise<IMaterial | null>;
  Delete(id: string): Promise<any>;
}
