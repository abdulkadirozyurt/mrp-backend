import IModel from "../../Entities/Abstract/IModel";

export default interface IEntityRepository<T extends IModel> {
  GetAll(filter?: any, populateFields?: string[]): Promise<T[]>;
  GetById(id: string, populateFields?: string[]): Promise<T | null>;
  Create(entity: T): Promise<string>;
  Update(id: string, entity: Partial<T>): Promise<void>;
  Delete(id: string): Promise<void>;
}
