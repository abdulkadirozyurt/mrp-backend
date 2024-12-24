import { Request, Response } from "express";
import { Product } from "../../../Entities/Concrete/Product";
import IProductService from "../../../Business/Abstract/IProductService";
import IProduct from "../../../Entities/Abstract/IProduct";
import { inject, injectable } from "tsyringe";
import TYPES from "../../IoC/Types";
import { Material } from "../../../Entities/Concrete/Material";
import IMaterialService from "../../../Business/Abstract/IMaterialService";

@injectable()
export default class ProductsController {
  constructor(
    @inject(TYPES.IProductService) private readonly productService: IProductService,
    @inject(TYPES.IMaterialService) private readonly materialService: IMaterialService
  ) {}

  public GetAll = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.GetAll({}, ["billOfMaterials", "materialId"]);
      res.status(200).json({
        success: true,
        message: "all products listed",
        products: products,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public GetById = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const product = await this.productService.GetById(id, ["billOfMaterials", "materialId"]);
      if (product) {
        res.status(200).json({ success: true, message: "product listed", data: product });
      } else {
        res.status(404).json({ success: false, message: "Product not found" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // public Create = async (req: Request, res: Response) => {
  //   try {
  //     const product = req.body;
  //     const result = await this.productService.Create(product);
  //     res.status(201).json({ success: true, message: "product created", data: result });
  //   } catch (error: any) {
  //     console.error(error.message);
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // };

  public Create = async (req: Request, res: Response) => {
    try {
      const product: IProduct = req.body;

      if (!product.name || !product.unitType || !product.billOfMaterials) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      for (const item of product.billOfMaterials) {
        const materialExists = await this.materialService.GetById(item.materialId.toString());
        if (!materialExists) {
          return res.status(400).json({ success: false, message: `Material not found: ${item.materialId}` });
        }

        if (materialExists.stockAmount < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Material stock amount is not enough: ${materialExists.name}`,
          });
        }
      }

      const result = await this.productService.Create(product);
      return res.status(201).json({ success: true, message: "Product created", result: result });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  public Update = async (req: Request, res: Response) => {
    const { id, ...product } = req.body;

    try {
      const existingProduct = await this.productService.GetById(id);
      if (!existingProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      for (const item of product.billOfMaterials) {
        const materialExists = await this.materialService.GetById(item.materialId);
        if (!materialExists) {
          return res.status(400).json({ success: false, message: `Material not found: ${item.materialId}` });
        }

        if (materialExists.stockAmount < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Material stock amount is not enough: ${materialExists.name}`,
          });
        }
      }

      const updatedProduct = await this.productService.Update(id, product);
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Delete = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      const existingProduct = await this.productService.GetById(id);

      if (!existingProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      if (existingProduct.billOfMaterials.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Product cannot be deleted because it is linked to materials.",
        });
      }

      await this.productService.Delete(id);
      return res.status(204).end();
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}
