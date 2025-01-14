import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import IWarehouseService from "../../../Business/Abstract/IWarehouseService";
import ContainerTypes from "../../IoC/ContainerTypes";

@injectable()
export default class WarehousesController {
  constructor(@inject(ContainerTypes.IWarehouseService) private readonly _warehouseService: IWarehouseService) {}

  GetAll = async (req: Request, res: Response) => {
    try {
      const warehouses = await this._warehouseService.GetAll({}, ["managerId"]);
      res.status(200).json({ success: true, message: "All warehouses listed", warehouses });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  GetById = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      const warehouse = await this._warehouseService.GetById(id, ["managerId"]);
      if (!warehouse) {
        res.status(404).json({ success: false, message: "Warehouse not found" });
      } else {
        res.status(200).json({ success: true, message: "Warehouse details", warehouse });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  Create = async (req: Request, res: Response) => {
    try {
      const warehouse = await this._warehouseService.Create(req.body);
      res.status(201).json({ success: true, message: "Warehouse created", warehouse });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  Update = async (req: Request, res: Response) => {
    const { id,...warehouse } = req.body;
    try {
      const updatedWarehouse = await this._warehouseService.Update(id, warehouse);
      res.status(200).json({ success: true, message: "Warehouse updated", updatedWarehouse });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  Delete = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      await this._warehouseService.Delete(id);
      res.status(200).json({ success: true, message: "Warehouse deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
