import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import ISupplierOrderService from "../../../Business/Abstract/ISupplierOrderService";
import ISupplierOrder from "../../../Entities/Abstract/ISupplierOrder";
import ContainerTypes from "../../IoC/ContainerTypes";

@injectable()
export default class SupplierOrdersController {
  constructor(
    @inject(ContainerTypes.ISupplierOrderService)
    private readonly supplierOrderService: ISupplierOrderService
  ) {}

  public async GetAll(req: Request, res: Response) {
    try {
      const orders = await this.supplierOrderService.GetAll({}, ["materials.materialId", "supplierId"]);
      res.status(200).json({ success: true, message: "All supplier orders listed", orders });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async GetById(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }
    try {
      const order = await this.supplierOrderService.GetById(id, ["materials.materialId", "supplierId"]);
      if (order) {
        res.status(200).json({ success: true, message: "Supplier order details received", order });
      } else {
        res.status(404).json({ success: false, message: "Order not found" });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async Create(req: Request, res: Response) {
    const order: ISupplierOrder = req.body;
    if (!order || !order.materials || order.materials.length === 0) {
      return res.status(400).json({ success: false, message: "Order details are incomplete" });
    }
    try {
      const createdOrder = await this.supplierOrderService.Create(order);
      res.status(200).json({ success: true, message: "Supplier order created", order: createdOrder });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async Update(req: Request, res: Response) {
    const { id, ...order } = req.body;
    if (!id || !order) {
      return res.status(400).json({ success: false, message: "Order ID and update details are required" });
    }
    try {
      const updatedOrder = await this.supplierOrderService.Update(id, order);
      res.status(200).json({ success: true, message: "Supplier order updated", updatedOrder });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async Delete(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }
    try {
      await this.supplierOrderService.Delete(id);
      res.status(200).json({ success: true, message: "Supplier order deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
