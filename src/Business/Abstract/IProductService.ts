import IModel from "../../Core/Entities/Abstract/IModel";
import IProduct from "../../Entities/Abstract/IProduct";

export default interface IProductService {
  GetAll(): Promise<any>;
  GetById(id: string): Promise<any>;
  Create(product: IProduct): Promise<any>;
  Update(id: string, product: IProduct): Promise<any>;
  Delete(id: string): Promise<any>;
}
