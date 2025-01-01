import { inject, injectable } from "tsyringe";
import TYPES from "../../IoC/ContainerTypes";
import ISupplierService from "../../../Business/Abstract/ISupplierService";
import { Request, Response } from "express";

@injectable()
export default class SuppliersController {
  constructor(@inject(TYPES.ISupplierService) private readonly _supplierService: ISupplierService) {}

  public GetAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const suppliers = await this._supplierService.GetAll({}, ["materialsOfSupplied"]);
      res.status(200).json({ success: true, message: "All suppliers listed", suppliers: suppliers });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public GetById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    try {
      const supplier = await this._supplierService.GetById(id, ["materialsOfSupplied"]);
      if (supplier) {
        res.status(200).json({ success: true, message: "Supplier listed", data: supplier });
      } else {
        res.status(404).json({ success: false, message: "Supplier not found" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Create = async (req: Request, res: Response): Promise<void> => {
    try {
      const supplier = req.body;
      const result = await this._supplierService.Create(supplier);
      res.status(201).json({ success: true, message: "Supplier created", result: result });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Update = async (req: Request, res: Response): Promise<void> => {
    const { id, ...supplier } = req.body;
    try {
      const updatedSupplier = await this._supplierService.Update(id, supplier);
      if (updatedSupplier) {
        res.status(200).json({ success: true, message: "Supplier updated", data: updatedSupplier });
      } else {
        res.status(404).json({ success: false, message: "Supplier not found" });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    try {
      await this._supplierService.Delete(id);
      res.status(200).json({ success: true, message: "Supplier deleted" });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
