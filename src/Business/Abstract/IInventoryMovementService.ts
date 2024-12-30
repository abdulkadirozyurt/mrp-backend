import { FilterQuery } from "mongoose";
import IInventoryMovement from "../../Entities/Abstract/IInventoryMovement";

export default interface IInventoryMovementService {
  GetAll(filter?: FilterQuery<IInventoryMovement>, populateFields?: string[]): Promise<IInventoryMovement[]>;
  GetById(id: string, populateFields?: string[]): Promise<IInventoryMovement | null>;
  Create(inventoryMovement: IInventoryMovement): Promise<IInventoryMovement>;
  Update(id: string, inventoryMovement: Partial<IInventoryMovement>): Promise<IInventoryMovement | null>;
  Delete(id: string): Promise<any>;
}
