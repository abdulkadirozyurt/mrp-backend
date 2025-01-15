import { Request, Response } from "express";
import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";
import ISupplierOrderService from "../../../Business/Abstract/ISupplierOrderService";
import ISupplierService from "../../../Business/Abstract/ISupplierService";
import ISupplierOrder from "../../../Entities/Abstract/ISupplierOrder";
import ContainerTypes from "../../IoC/ContainerTypes";

@injectable()
export default class SupplierOrdersController {
  constructor(
    @inject(ContainerTypes.ISupplierOrderService) private readonly _supplierOrderService: ISupplierOrderService,
    @inject(ContainerTypes.ISupplierService) private readonly _supplierService: ISupplierService
  ) {}

  GetAll = async (req: Request, res: Response) => {
    try {
      const orders = await this._supplierOrderService.GetAll({}, ["supplierId", "warehouseId", "materialId"]);
      res.status(200).json({ success: true, message: "All supplier orders listed", orders });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  GetById = async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }
    try {
      const order = await this._supplierOrderService.GetById(id, ["supplierId", "warehouseId", "materialId"]);
      if (order) {
        res.status(200).json({ success: true, message: "Supplier order details received", order });
      } else {
        res.status(404).json({ success: false, message: "Order not found" });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  Create = async (req: Request, res: Response) => {
    console.log(req.body);

    const order: ISupplierOrder = req.body;
    console.log(order);

    if (!order || !order.materialId) {
      return res.status(400).json({ success: false, message: "Order details are incomplete" });
    }
    try {
      const createdOrder = await this._supplierOrderService.Create(order);
      res.status(200).json({ success: true, message: "Supplier order created", order: createdOrder });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  Update = async (req: Request, res: Response) => {
    const { id, ...order } = req.body;
    if (!id || !order) {
      return res.status(400).json({ success: false, message: "Order ID and update details are required" });
    }
    try {
      const updatedOrder = await this._supplierOrderService.Update(id, order);
      res.status(200).json({ success: true, message: "Supplier order updated", updatedOrder });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  Delete = async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }
    try {
      await this._supplierOrderService.Delete(id);
      res.status(200).json({ success: true, message: "Supplier order deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
