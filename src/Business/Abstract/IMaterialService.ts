import IMaterial from "../../Entities/Abstract/IMaterial";

export default interface IMaterialService {
  GetAll(): Promise<any>;
  GetById(id: string): Promise<any>;
  Create(product: IMaterial): Promise<any>;
  Update(id: string, product: IMaterial): Promise<any>;
  Delete(id: string): Promise<any>;
}
