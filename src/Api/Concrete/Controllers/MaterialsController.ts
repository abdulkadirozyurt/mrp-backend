import ContainerTypes from "../../IoC/ContainerTypes";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import IMaterial from "../../../Entities/Abstract/IMaterial";
import IMaterialService from "./../../../Business/Abstract/IMaterialService";
import mongoose from "mongoose";

@injectable()
export default class MaterialsController {
  constructor(@inject(ContainerTypes.IMaterialService) private readonly _materialService: IMaterialService) {}

  public GetAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const materials = await this._materialService.GetAll({}, ["suppliers"]);
      res.status(200).json({ success: true, message: "All materials listed", materials: materials });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public GetById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    try {
      const material = await this._materialService.GetById(id, ["suppliers"]);
      if (material) {
        res.status(200).json({ success: true, message: "Material listed", data: material });
      } else {
        res.status(404).json({ success: false, message: "Material not found" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Create = async (req: Request, res: Response): Promise<void> => {
    try {
      const material: IMaterial = req.body;
      const addedMaterial = await this._materialService.Create(material);
      res.status(201).json({ success: true, message: "Material created", material: addedMaterial });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Update = async (req: Request, res: Response): Promise<void> => {
    const { id, ...material } = req.body;

    try {
      const updatedMaterial = await this._materialService.Update(id, material);
      if (updatedMaterial) {
        res.status(200).json({ success: true, message: "Material updated", data: updatedMaterial });
      } else {
        res.status(404).json({ success: false, message: "Material not found" });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    try {
      await this._materialService.Delete(id);
      res.status(204).end();
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public TransferStock = async (req: Request, res: Response): Promise<void> => {
    const { sourceMaterialId, targetMaterialId, quantity } = req.body;
    try {
      await this._materialService.TransferStock(sourceMaterialId, targetMaterialId, quantity);
      res.status(200).json({ success: true, message: "Stock transferred" });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public GetSuppliersByMaterial = async (req: Request, res: Response): Promise<void> => {
    try {
      const { materialId } = req.body;

      if (!materialId || !mongoose.Types.ObjectId.isValid(materialId)) {
        res.status(400).json({ success: false, message: "Invalid material ID" });
        return;
      }

      const material = await this._materialService.GetById(materialId, ["suppliers"]);

      if (!material) {
        res.status(404).json({ success: false, message: "Material not found" });
        return;
      }

      res.status(200).json({ success: true, suppliers: material.suppliers });
    } catch (error: any) {
      console.error("Error fetching suppliers for material:", error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
