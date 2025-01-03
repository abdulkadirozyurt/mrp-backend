import ContainerTypes from "../../IoC/ContainerTypes";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import IMaterial from "../../../Entities/Abstract/IMaterial";
import IMaterialService from "./../../../Business/Abstract/IMaterialService";

@injectable()
export default class MaterialsController {
  constructor(@inject(ContainerTypes.IMaterialService) private readonly materialService: IMaterialService) {}

  public GetAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const materials = await this.materialService.GetAll({}, ["suppliers"]);
      res.status(200).json({ success: true, message: "All materials listed", materials: materials });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public GetById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    try {
      const material = await this.materialService.GetById(id, ["suppliers"]);
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
      const addedMaterial = await this.materialService.Create(material);
      res.status(201).json({ success: true, message: "Material created", material: addedMaterial });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Update = async (req: Request, res: Response): Promise<void> => {
    const { id, ...material } = req.body;

    try {
      const updatedMaterial = await this.materialService.Update(id, material);
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
      await this.materialService.Delete(id);
      res.status(204).end();
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public TransferStock = async (req: Request, res: Response): Promise<void> => {
    const { sourceMaterialId, targetMaterialId, quantity } = req.body;
    try {
      await this.materialService.TransferStock(sourceMaterialId, targetMaterialId, quantity);
      res.status(200).json({ success: true, message: "Stock transferred" });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
