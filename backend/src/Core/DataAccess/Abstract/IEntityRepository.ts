import IModel from "../../Entities/Abstract/IModel";

export default interface IEntityRepository<T extends IModel> {
  GetAll(filter?: any): Promise<T[]>;
  GetById(id: string): Promise<T | null>;
  Create(entity: T): Promise<string>;
  Update(id: string, entity: T): Promise<void>;
  Delete(id: string): Promise<void>;
}
