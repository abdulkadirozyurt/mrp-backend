import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import ContainerTypes from "../../IoC/ContainerTypes";
import IProductService from "../../../Business/Abstract/IProductService";
import IMaterialService from "../../../Business/Abstract/IMaterialService";
import IProduct from "../../../Entities/Abstract/IProduct";
import mongoose from "mongoose";
import IMaterial from "../../../Entities/Abstract/IMaterial";

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
    @inject(ContainerTypes.IMaterialService) private readonly _materialService: IMaterialService
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
        const materialId = bom.materialId._id || bom.materialId; // `_id` alanına eriş
        const material = materials.find((material: IMaterial) => material._id?.toString() === materialId.toString());

        if (material) {
          const materialName = material.name;
          const totalRequiredQuantity = requiredQuantity * bom.quantity;
          const availableStock = material.stockAmount || 0;
          const shortfall = totalRequiredQuantity > availableStock ? totalRequiredQuantity - availableStock : 0;

          mrpResult[(material._id as mongoose.Types.ObjectId).toString()] = {
            materialName,
            totalRequiredQuantity,
            availableStock,
            shortfall,
          };

          console.log(`Material: ${materialName}, Total Required: ${totalRequiredQuantity}, Available: ${availableStock}, Shortfall: ${shortfall}`);
        }
      });

      return res.status(200).json({
        success: true,
        message: "MRP calculation completed",
        data: mrpResult,
      });
    } catch (error: any) {
      console.error("MRP Calculation Error: ", error.message);
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
