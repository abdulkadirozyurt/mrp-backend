import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import IMaterialService from "../../../Business/Abstract/IMaterialService";
import IProductService from "../../../Business/Abstract/IProductService";
import IProduct from "../../../Entities/Abstract/IProduct";
import TYPES from "../../IoC/Types";
import mongoose from "mongoose";

@injectable()
export default class ProductsController {
  constructor(
    @inject(TYPES.IProductService) private readonly productService: IProductService,
    @inject(TYPES.IMaterialService) private readonly materialService: IMaterialService
  ) {}

  public GetAll = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.GetAll({}, ["billOfMaterials.materialId"]);
      return res.status(200).json({
        success: true,
        message: "All products listed",
        products: products,
      });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  public GetById = async (req: Request, res: Response) => {
    const { id } = req.body;
    // const objectId = new mongoose.Schema.Types.ObjectId(id);
    try {
      const product = await this.productService.GetById(id, ["billOfMaterials.materialId"]);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, message: "Product listed", data: product });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  public Create = async (req: Request, res: Response) => {
    try {
      const product: IProduct = req.body;

      if (!product.name || !product.unitType || !product.billOfMaterials) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
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

      const updatedProduct = await this.productService.Update(id, product);
      res.status(200).json({ success: true, message: "Product updated", data: updatedProduct });
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
      return res.status(204).json({ success: true, message: "Product deleted" });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}
