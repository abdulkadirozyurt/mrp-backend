import { Request, Response } from "express";
import { Product } from "../../../Entities/Concrete/ProductModel";
import IProductService from "../../../Business/Abstract/IProductService";

export default class ProductsController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  public GetAll = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.GetAll();
      res.status(200).json({ success: true, message: "all products listed", data: products });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
