import { FilterQuery } from "mongoose";
import { IOrder } from "../../Entities/Abstract/IOrder";
import IOrderService from "../Abstract/IOrderService";
import { inject, injectable } from "tsyringe";
import ContainerTypes from "../../Api/IoC/ContainerTypes";
import IOrderDal from "../../DataAccess/Abstract/IOrderDal";
import IMaterialService from "../Abstract/IMaterialService";
import IInventoryMovementService from "../Abstract/IInventoryMovementService";
import IProductService from "../Abstract/IProductService";
import { MaterialMovementTypes } from "../../Utilities/Enums/Material/materialEnums";

@injectable()
export default class OrderManager implements IOrderService {
  constructor(
    @inject(ContainerTypes.IOrderDal) private readonly _orderDal: IOrderDal,
    @inject(ContainerTypes.IMaterialService) private readonly _materialService: IMaterialService,
    @inject(ContainerTypes.IInventoryMovementService) private readonly _inventoryMovementService: IInventoryMovementService,
    @inject(ContainerTypes.IProductService) private readonly _productService: IProductService
  ) {}

  GetAll(filter?: FilterQuery<IOrder>, populateFields?: string[]): Promise<IOrder[]> {
    return this._orderDal.GetAll(filter, populateFields);
  }

  GetById(id: string, populateFields?: string[]): Promise<IOrder | null> {
    return this._orderDal.GetById(id, populateFields);
  }

  async Create(order: IOrder): Promise<IOrder> {
    try {
      for (const product of order.products) {
        const productDetails = await this._productService.GetById(product.productId.toString(), ["billOfMaterials"]);
        if (!productDetails) {
          throw new Error(`Product with ID ${product.productId} not found`);
        }

        for (const material of productDetails.billOfMaterials) {
          const materialId = material.materialId.toString();
          const quantity = material.quantity * product.quantity;

          try {
            await this._materialService.UpdateStock(materialId, quantity, MaterialMovementTypes.OUT);
          } catch (error: any) {
            throw new Error(`Stock update failed for material '${materialId}' due to insufficient stock or other issues.`);
        }
        }
      }

      return this._orderDal.Create(order);
    } catch (error: any) {
      console.error(`Order creation failed: ${error.message}`);
      throw error;
    }
  }

  Update(id: string, order: Partial<IOrder>): Promise<IOrder | null> {
    return this._orderDal.Update(id, order);
  }

  Delete(id: string): Promise<void> {
    return this._orderDal.Delete(id);
  }
}
