import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import ICustomerService from "../../../Business/Abstract/ICustomerService";
import ICustomer from "../../../Entities/Abstract/ICustomer";
import ContainerTypes from "../../IoC/ContainerTypes";

@injectable()
export default class CustomersController {
  constructor(@inject(ContainerTypes.ICustomerService) private readonly _customerService: ICustomerService) {}

  public async GetAll(req: Request, res: Response): Promise<void> {
    console.log("_customerService:", this._customerService);
    try {
      const customers = await this._customerService.GetAll();
      res.status(200).json({ success: true, message: "All customers listed", customers });
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  }

  public async GetById(req: Request, res: Response): Promise<void> {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: "Customer ID is required" });
      return;
    }

    try {
      const customer = await this._customerService.GetById(id);
      if (!customer) {
        res.status(404).json({ success: false, message: "Customer not found" });
      } else {
        res.status(200).json({ success: true, message: "Customer details", customer });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  }

  public async Create(req: Request, res: Response): Promise<void> {
    const customer: ICustomer = req.body;

    if (!customer || !customer.companyName || !customer.contactName || !customer.email || !customer.phone || !customer.address) {
      res.status(400).json({ success: false, message: "Invalid customer data" });
      return;
    }

    try {
      const createdCustomer = await this._customerService.Create(customer);
      res.status(201).json({ success: true, message: "Customer created", customer: createdCustomer });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async Update(req: Request, res: Response): Promise<void> {
    const { id, ...customer } = req.body;

    if (!id || !customer) {
      res.status(400).json({ success: false, message: "Customer ID and update data are required" });
      return;
    }

    try {
      const updatedCustomer = await this._customerService.Update(id, customer);
      if (!updatedCustomer) {
        res.status(404).json({ success: false, message: "Customer not found" });
      } else {
        res.status(200).json({ success: true, message: "Customer updated", customer: updatedCustomer });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async Delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: "Customer ID is required" });
      return;
    }

    try {
      const existingCustomer = await this._customerService.GetById(id);
      if (!existingCustomer) {
        res.status(404).json({ success: false, message: "Customer not found" });
        return;
      }

      await this._customerService.Delete(id);
      res.status(200).json({ success: true, message: "Customer deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
