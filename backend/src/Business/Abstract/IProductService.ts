import IModel from "../../Core/Entities/Abstract/IModel";

export default interface IProductService {
  GetAll(): Promise<any>;
  GetById(id: string): Promise<any>;
  Create(product: IModel): Promise<any>;
  Update(id: string, product: IModel): Promise<any>;
  Delete(id: string): Promise<any>;
}
