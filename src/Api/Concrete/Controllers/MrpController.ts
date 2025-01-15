import { Request, Response } from "express";
import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";
import IMaterialService from "../../../Business/Abstract/IMaterialService";
import IProductService from "../../../Business/Abstract/IProductService";
import ISupplierOrderService from "../../../Business/Abstract/ISupplierOrderService";
import IMaterial from "../../../Entities/Abstract/IMaterial";
import ContainerTypes from "../../IoC/ContainerTypes";
import ISupplierOrder from "../../../Entities/Abstract/ISupplierOrder";

interface MrpResult {
  materialName: string;
  totalRequiredQuantity: number;
  availableStock: number;
  shortfall: number;
}

@injectable()
export default class MrpController {
  constructor(
    @inject(ContainerTypes.IProductService) private readonly _productService: IProductService,
    @inject(ContainerTypes.IMaterialService) private readonly _materialService: IMaterialService,
    @inject(ContainerTypes.ISupplierOrderService) private readonly _supplierOrderService: ISupplierOrderService
  ) {}

  public Calculate = async (req: Request, res: Response): Promise<Response<any>> => {
    try {
      const { productId, requiredQuantity } = req.body;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, message: "Invalid productId" });
      }

      if (!productId || !requiredQuantity) {
        return res.status(400).json({
          success: false,
          message: "productId and requiredQuantity are required.",
        });
      }

      const product = await this.GetProduct(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      const materialIds = product.billOfMaterials.map((bom) => bom.materialId);
      const materials = await this._materialService.GetAll({ _id: { $in: materialIds } });

      const mrpResult: Record<string, MrpResult> = {};

      product.billOfMaterials.forEach((bom) => {
        const materialId = bom.materialId._id || bom.materialId;
        const material = materials.find((material: IMaterial) => material._id?.toString() === materialId.toString());

        if (material) {
          const materialName = material.name;
          const totalRequiredQuantity = requiredQuantity * bom.quantity;
          const availableStock = material.stockAmount || 0;
          const shortfall = totalRequiredQuantity > availableStock ? totalRequiredQuantity - availableStock : 0;

          mrpResult[(material._id as mongoose.Schema.Types.ObjectId).toString()] = {
            materialName,
            totalRequiredQuantity,
            availableStock,
            shortfall,
          };
        }
      });

      return res.status(200).json({
        success: true,
        message: "MRP calculation completed",
        result: mrpResult,
      });
    } catch (error: any) {
      console.error("MRP Calculation Error: ", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public CreateSupplierOrder = async (req: Request, res: Response): Promise<Response<any>> => {
    try {
      const { warehouseId, mrpResult } = req.body;

      if (!warehouseId || !mrpResult || Object.keys(mrpResult).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Warehouse ID and MRP result are required.",
        });
      }

      const orders = [];

      for (const [materialId, result] of Object.entries(mrpResult)) {
        const { shortfall } = result as any;

        if (shortfall > 0) {
          // Malzemeyi tedarik eden tedarikçileri bul
          const material = await this.GetMaterial(materialId);
          const suppliers = material?.suppliers || [];

          if (suppliers.length === 0) {
            return res.status(400).json({
              success: false,
              message: `No suppliers found for material ID ${materialId}`,
            });
          }

          // İlk uygun tedarikçiyi seç
          const supplierId = suppliers[0];

          const warehouseIdObj = new mongoose.Types.ObjectId(warehouseId.toString());
          const supplierIdObj = new mongoose.Types.ObjectId(supplierId.toString());
          const materialIdObj = new mongoose.Types.ObjectId(materialId.toString());

          // Sipariş oluştur
          const order = await this._supplierOrderService.Create({
            warehouseId: warehouseIdObj,
            supplierId: supplierIdObj,
            materialId: materialIdObj,
            quantity: shortfall,
            orderDate: new Date(),
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: "pending",
            companyName: "Default Company Name",
          } as ISupplierOrder);

          orders.push(order);
        }
      }

      return res.status(201).json({
        success: true,
        message: "Supplier orders created successfully.",
        orders,
      });
    } catch (error: any) {
      console.error("CreateSupplierOrder Error: ", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public GetProduct = async (productId: string) => {
    try {
      const product = await this._productService.GetById(productId, ["billOfMaterials.materialId"]);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      return product;
    } catch (error: any) {
      console.error("GetProduct Error: ", error.message);
      throw error;
    }
  };

  public GetMaterial = async (materialId: any) => {
    try {
      const material = await this._materialService.GetById(materialId, ["suppliers"]);
      if (!material) {
        throw new Error(`Material with ID ${materialId} not found`);
      }
      return material;
    } catch (error: any) {
      console.error("GetMaterial Error: ", error.message);
      throw error;
    }
  };
}
