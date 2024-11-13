import IModel from "../../Core/Entities/Abstract/IModel";
import IProductService from "../Abstract/IProductService";

export default class ProductManager implements IProductService {
    GetAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    Create(product: IModel): Promise<any> {
        throw new Error("Method not implemented.");
    }
    Update(id: string, product: IModel): Promise<any> {
        throw new Error("Method not implemented.");
    }
    Delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}