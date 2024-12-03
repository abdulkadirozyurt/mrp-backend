import { Request, Response } from "express";
import IMaterial from "../../../Entities/Abstract/IMaterial";
import IMaterialService from "./../../../Business/Abstract/IMaterialService";
import { inject, injectable } from "tsyringe";

@injectable()
export default class MaterialsController {
  private materialService: IMaterialService;

  constructor(@inject("IMaterialService") materialService: IMaterialService) {
    this.materialService = materialService;
  }

  public GetAll = async (req: Request, res: Response) => {
    try {
      const materials = await this.materialService.GetAll();
      res.status(200).json({ success: true, message: "all materials listed", data: materials });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public GetById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const material = await this.materialService.GetById(id);
      res.status(200).json({ success: true, message: "material listed", data: material });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Create = async (req: Request, res: Response) => {
    try {
      const material: IMaterial = req.body;
      const result = await this.materialService.Create(material);
      res.status(201).json({ success: true, message: "material created", data: result });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const material: IMaterial = req.body;
      await this.materialService.Update(id, material);
      res.status(200).json({ success: true, message: "material updated" });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  public Delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.materialService.Delete(id);
      res.status(200).json({ success: true, message: "material deleted" });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
