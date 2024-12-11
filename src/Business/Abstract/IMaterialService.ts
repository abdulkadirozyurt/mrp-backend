import IMaterial from "../../Entities/Abstract/IMaterial";

export default interface IMaterialService {
  GetAll(): Promise<IMaterial[]>;
  GetById(id: string): Promise<IMaterial | null>;
  Create(product: IMaterial): Promise<IMaterial>;
  Update(id: string, product: IMaterial): Promise<IMaterial | null>;
  Delete(id: string): Promise<any>;
}
