import { FilterQuery } from "mongoose";
import { inject, injectable } from "tsyringe";
import ICustomer from "../../Entities/Abstract/ICustomer";
import ICustomerService from "../Abstract/ICustomerService";
import ContainerTypes from "../../Api/IoC/ContainerTypes";
import ICustomerDal from "../../DataAccess/Abstract/ICustomerDal";

@injectable()
export default class CustomerManager implements ICustomerService {
  constructor(@inject(ContainerTypes.ICustomerDal) private readonly _customerDal: ICustomerDal) {}

  public async GetAll(filter?: FilterQuery<ICustomer>, populateFields?: string[]): Promise<ICustomer[]> {
    return await this._customerDal.GetAll(filter, populateFields);
  }

  public async GetById(id: string, populateFields?: string[]): Promise<ICustomer | null> {
    return await this._customerDal.GetById(id, populateFields);
  }

  public async Create(customer: ICustomer): Promise<ICustomer> {
    const existingCustomer = await this._customerDal.GetAll({ email: customer.email });
    if (existingCustomer.length > 0) {
      throw new Error("Customer with the same email already exists");
    }
    return await this._customerDal.Create(customer);
  }

  public async Update(id: string, customer: Partial<ICustomer>): Promise<ICustomer | null> {
    return await this._customerDal.Update(id, customer);
  }

  public async Delete(id: string): Promise<void> {
    await this._customerDal.Delete(id);
  }
}
