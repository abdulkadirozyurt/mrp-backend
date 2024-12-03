import { Request, Response } from "express";
import { Product } from "../../../Entities/Concrete/Product";
import IProductService from "../../../Business/Abstract/IProductService";
import IProduct from "../../../Entities/Abstract/IProduct";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ProductsController {
  private readonly productService: IProductService;

  constructor(@inject("IProductService") productService: IProductService) {
    this.productService = productService;
  }

  public GetAll = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.GetAll();
      res.status(200).json({ success: true, message: "all products listed", data: products });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public GetById = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const product = await this.productService.GetById(id);
      res.status(200).json({ success: true, message: "product listed", data: product });
    } catch (error) {}
  };

  public Create = async (req: Request, res: Response) => {
    try {
      const product: IProduct = req.body;
      const result = await this.productService.Create(product);
      res.status(201).json({ success: true, message: "product created", data: result });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Update = async (req: Request, res: Response) => {
    const { id,...product } = req.body;
    try {
      await this.productService.Update(id, product);
      res.status(200).json({ success: true, message: "product updated" });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Delete = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      await this.productService.Delete(id);
      res.status(200).json({ success: true, message: "product deleted" });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
