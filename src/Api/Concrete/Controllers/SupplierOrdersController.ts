import { SupplierOrder } from "./../../../Entities/Concrete/SupplierOrder ";
import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import ISupplierOrderService from "../../../Business/Abstract/ISupplierOrderService";
import ISupplierOrder from "../../../Entities/Abstract/ISupplierOrder";
import ContainerTypes from "../../IoC/ContainerTypes";
import mongoose from "mongoose";

@injectable()
export default class SupplierOrdersController {
  constructor(
    @inject(ContainerTypes.ISupplierOrderService)
    private readonly supplierOrderService: ISupplierOrderService
  ) {}

  GetAll = async (req: Request, res: Response) => {
    try {
      const orders = await this.supplierOrderService.GetAll({}, ["materials.materialId", "supplierId"]);
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
      const order = await this.supplierOrderService.GetById(id, ["materials.materialId", "supplierId"]);
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
    const order: ISupplierOrder = req.body;
    console.log(order);

    if (!order || !order.materials || order.materials.length === 0) {
      return res.status(400).json({ success: false, message: "Order details are incomplete" });
    }
    try {
      const createdOrder = await this.supplierOrderService.Create(order);
      res.status(200).json({ success: true, message: "Supplier order created", order: createdOrder });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // CreateFromMRP = async (req: Request, res: Response) => {
  //   try {
  //     const { supplierId, warehouseId, mrpResult } = req.body;

  //     if (!supplierId || !warehouseId || !mrpResult) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Supplier ID, Warehouse ID, and MRP Result are required.",
  //       });
  //     }

  //     const supplier = await this.supplierOrderService.GetById(supplierId);

  //     const orderMaterials = Object.entries(mrpResult)
  //       .filter(([_, result]: [string, any]) => result.shortfall > 0)
  //       .map(([materialId, result]: [string, any]) => ({
  //         materialId: new mongoose.Types.ObjectId(materialId),
  //         quantity: result.shortfall as number,
  //       }));

  //     if (orderMaterials.length === 0) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "No materials with shortfall found in MRP result.",
  //       });
  //     }

  //     const createdOrder = new SupplierOrder({
  //       supplierId: new mongoose.Schema.Types.ObjectId(supplierId),
  //       warehouseId: new mongoose.Schema.Types.ObjectId(warehouseId),
  //       materials: orderMaterials,
  //       companyName: supplier?.companyName,
  //       status: "pending",
  //       orderDate: new Date(),
  //       deliveryDate: new Date(),
  //     });

  //     await createdOrder.save();

  //     res.status(201).json({
  //       success: true,
  //       message: "Supplier order created from MRP result",
  //       order: createdOrder,
  //     });
  //   } catch (error: any) {
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // };

  Update = async (req: Request, res: Response) => {
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
  };

  Delete = async (req: Request, res: Response) => {
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
  };
}
