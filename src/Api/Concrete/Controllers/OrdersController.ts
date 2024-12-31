import { inject, injectable } from "tsyringe";
import ContainerTypes from "../../IoC/ContainerTypes";
import IOrderService from "../../../Business/Abstract/IOrderService";
import { Request, Response } from "express";
import { IOrder } from "../../../Entities/Abstract/IOrder";

@injectable()
export default class OrdersController {
  constructor(@inject(ContainerTypes.IOrderService) private readonly _orderService: IOrderService) {}

  public async GetAll(req: Request, res: Response) {
    try {
      const orders = await this._orderService.GetAll({}, ["products.productId"]);
      return res.status(200).json({ success: true, message: "All orders listed", orders: orders });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: "Internal server error", error: error });
    }
  }

  public async GetById(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }
    try {
      const order = await this._orderService.GetById(id, ["products.productId"]);
      if (order) {
        return res.status(200).json({ success: true, message: "Order details received", order: order });
      } else {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  public async Create(req: Request, res: Response) {
    const order: IOrder = req.body;
    if (!order || !order.products || order.products.length === 0) {
      return res.status(400).json({ success: false, message: "Order details are incomplete" });
    }
    try {
      const createdOrder = await this._orderService.Create(order);
      return res.status(200).json({ success: true, message: "Order created", order: createdOrder });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  public async Update(req: Request, res: Response) {
    const { id, ...order } = req.body;
    if (!id || !order) {
      return res.status(400).json({ success: false, message: "Order ID and update details are required" });
    }
    try {
      const existingOrder = await this._orderService.GetById(id);
      if (!existingOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      const updatedOrder = await this._orderService.Update(id, order);
      return res.status(200).json({ success: true, message: "Order updated", updatedOrder: updatedOrder });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  public async Delete(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }
    try {
      const existingOrder = await this._orderService.GetById(id);
      if (!existingOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      await this._orderService.Delete(id);
      return res.status(200).json({ success: true, message: "Order deleted" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
