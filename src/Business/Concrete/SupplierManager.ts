import { FilterQuery } from "mongoose";
import ISupplier from "../../Entities/Abstract/ISupplier";
import ISupplierService from "../Abstract/ISupplierService";
import { inject, injectable } from "tsyringe";
import TYPES from "../../Api/IoC/ContainerTypes";
import ISupplierDal from "../../DataAccess/Abstract/ISupplierDal";
import { Material } from "../../Entities/Concrete/Material"; // Material modelini dahil ediyoruz

@injectable()
export default class SupplierManager implements ISupplierService {
  constructor(@inject(TYPES.ISupplierDal) private readonly _supplierDal: ISupplierDal) {}

  async GetAll(filter?: FilterQuery<ISupplier>, populateFields?: string[]): Promise<ISupplier[]> {
    return await this._supplierDal.GetAll(filter, populateFields);
  }

  async GetById(id: string, populateFields?: string[]): Promise<ISupplier | null> {
    return await this._supplierDal.GetById(id, populateFields);
  }

  async Create(supplier: ISupplier): Promise<ISupplier> {
    // Supplier oluşturuyoruz
    const createdSupplier = await this._supplierDal.Create(supplier);

    // Material'ları güncelle
    if (supplier.materialsOfSupplied?.length > 0) {
      await Material.updateMany(
        { _id: { $in: supplier.materialsOfSupplied } },
        { $addToSet: { suppliers: createdSupplier._id } }
      );
    }

    return createdSupplier;
  }

  async Update(id: string, supplier: ISupplier): Promise<ISupplier | null> {
    // Eski Material listesine göre supplier'ı çıkar
    const existingSupplier = await this._supplierDal.GetById(id);
    if (existingSupplier?.materialsOfSupplied) {
      await Material.updateMany({ _id: { $in: existingSupplier.materialsOfSupplied } }, { $pull: { suppliers: id } });
    }

    // Yeni Material listesine göre supplier'ı ekle
    if (supplier.materialsOfSupplied?.length > 0) {
      await Material.updateMany({ _id: { $in: supplier.materialsOfSupplied } }, { $addToSet: { suppliers: id } });
    }

    // Supplier güncelle
    return await this._supplierDal.Update(id, supplier);
  }

  async Delete(id: string): Promise<void> {
    // Supplier silindiğinde, Material listelerinden de çıkar
    await Material.updateMany({ suppliers: id }, { $pull: { suppliers: id } });

    await this._supplierDal.Delete(id);
  }
}

// import { FilterQuery } from "mongoose";
// import ISupplier from "../../Entities/Abstract/ISupplier";
// import ISupplierService from "../Abstract/ISupplierService";
// import { inject, injectable } from "tsyringe";
// import TYPES from "../../Api/IoC/ContainerTypes";
// import ISupplierDal from "../../DataAccess/Abstract/ISupplierDal";

// @injectable()
// export default class SupplierManager implements ISupplierService {
//   constructor(@inject(TYPES.ISupplierDal) private readonly _supplierDal: ISupplierDal) {}

//   async GetAll(filter?: FilterQuery<ISupplier>, populateFields?: string[]): Promise<ISupplier[]> {
//     return await this._supplierDal.GetAll(filter, populateFields);
//   }

//   async GetById(id: string, populateFields?: string[]): Promise<ISupplier | null> {
//     return await this._supplierDal.GetById(id, populateFields);
//   }

//   async Create(product: ISupplier): Promise<ISupplier> {
//     return await this._supplierDal.Create(product);
//   }

//   async Update(id: string, product: ISupplier): Promise<ISupplier | null> {
//     return await this._supplierDal.Update(id, product);
//   }

//   async Delete(id: string): Promise<any> {
//     return await this._supplierDal.Delete(id);
//   }
// }
