import { FilterQuery } from "mongoose";
import IModel from "../../Entities/Abstract/IModel";

export default interface IEntityRepository<T extends IModel> {
  GetAll(filter?: any, populateFields?: string[]): Promise<T[]>;
  GetById(id: string, populateFields?: string[]): Promise<T | null>;
  Create(entity: T): Promise<T>;
  Update(id: string, entity: Partial<T>): Promise<T | null>;
  Delete(id: string): Promise<void>;
}
