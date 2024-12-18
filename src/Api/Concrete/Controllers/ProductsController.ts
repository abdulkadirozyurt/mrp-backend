import { Request, Response } from "express";
import { Product } from "../../../Entities/Concrete/Product";
import IProductService from "../../../Business/Abstract/IProductService";
import IProduct from "../../../Entities/Abstract/IProduct";
import { inject, injectable } from "tsyringe";
import TYPES from "../../IoC/Types";

@injectable()
export default class ProductsController {
  private readonly productService: IProductService;

  constructor(@inject(TYPES.IProductService) productService: IProductService) {
    this.productService = productService;
  }

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

  public Create = async (req: Request, res: Response) => {
    try {
      const product = req.body;
      const result = await this.productService.Create(product);
      res.status(201).json({ success: true, message: "product created", data: result });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Update = async (req: Request, res: Response) => {
    const { id, ...product } = req.body;
    try {
      const updatedProduct = await this.productService.Update(id, product);
      if (updatedProduct) {
        res.status(200).json({
          success: true,
          message: "product updated",
          data: updatedProduct,
        });
      } else {
        res.status(404).json({ success: false, message: "Product not found" });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Delete = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      await this.productService.Delete(id);
      res.status(204).end();
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
