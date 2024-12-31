import { FilterQuery } from "mongoose";
import IInventoryMovement from "../../Entities/Abstract/IInventoryMovement";
import IInventoryMovementService from "../Abstract/IInventoryMovementService";
import IInventoryMovementDal from "../../DataAccess/Abstract/IInventoryMovementDal";
import { inject, injectable } from "tsyringe";
import TYPES from "../../Api/IoC/ContainerTypes";
import IMaterialDal from "../../DataAccess/Abstract/IMaterialDal";

@injectable()
export default class InventoryMovementManager implements IInventoryMovementService {
  constructor(
    @inject(TYPES.IInventoryMovementDal) private readonly _inventoryMovementDal: IInventoryMovementDal,
    @inject(TYPES.IMaterialDal) private readonly _materialDal: IMaterialDal
  ) {}

  public async GetAll(
    filter?: FilterQuery<IInventoryMovement>,
    populateFields?: string[]
  ): Promise<IInventoryMovement[]> {
    return await this._inventoryMovementDal.GetAll(filter, populateFields);
  }
  public async GetById(id: string, populateFields?: string[]): Promise<IInventoryMovement | null> {
    return await this._inventoryMovementDal.GetById(id, populateFields);
  }
  public async Create(inventoryMovement: IInventoryMovement): Promise<IInventoryMovement> {
    await this._materialDal.UpdateStock(
      inventoryMovement.materialId.toString(),
      inventoryMovement.quantity,
      inventoryMovement.movementType
    );

    return await this._inventoryMovementDal.Create(inventoryMovement);
  }
  public async Update(
    id: string,
    inventoryMovement: Partial<IInventoryMovement>
  ): Promise<IInventoryMovement | null> {
    return await this._inventoryMovementDal.Update(id, inventoryMovement);
  }
  public async Delete(id: string): Promise<any> {
    await this._inventoryMovementDal.Delete(id);
  }
}
