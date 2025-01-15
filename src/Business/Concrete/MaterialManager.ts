import { inject, injectable } from "tsyringe";
import IMaterialDal from "../../DataAccess/Abstract/IMaterialDal";
import IMaterial from "../../Entities/Abstract/IMaterial";
import IMaterialService from "../Abstract/IMaterialService";
import TYPES from "../../Api/IoC/ContainerTypes";
import { FilterQuery } from "mongoose";
import IProduct from "../../Entities/Abstract/IProduct";
import ISupplier from "../../Entities/Abstract/ISupplier";
import { Supplier } from "../../Entities/Concrete/Supplier"; // Supplier modelini dahil ediyoruz
import { MaterialMovementTypes } from "../../Utilities/Enums/Material/materialEnums";

@injectable()
export default class MaterialManager implements IMaterialService {
  constructor(@inject(TYPES.IMaterialDal) private readonly _materialDal: IMaterialDal) {}

  public async GetAll(filter?: FilterQuery<IProduct>, populateFields?: string[]): Promise<IMaterial[]> {
    return await this._materialDal.GetAll(filter, populateFields);
  }

  public async GetById(id: string, populateFields?: string[]): Promise<IMaterial | null> {
    return await this._materialDal.GetById(id, populateFields);
  }

  public async Create(material: IMaterial): Promise<IMaterial> {
    // Material'i oluşturuyoruz
    const createdMaterial = await this._materialDal.Create(material);

    // Supplier'ları güncelle
    if (material.suppliers?.length > 0) {
      await Supplier.updateMany(
        { _id: { $in: material.suppliers } },
        { $addToSet: { materialsOfSupplied: createdMaterial._id } }
      );
    }

    return createdMaterial;
  }

  public async Update(id: string, material: Partial<IMaterial>): Promise<IMaterial | null> {
    // Material'i güncelliyoruz
    const updatedMaterial = await this._materialDal.Update(id, material);

    if (material.suppliers) {
      // Eski supplier'ların listesinden bu material'i kaldır
      await Supplier.updateMany({ materialsOfSupplied: id }, { $pull: { materialsOfSupplied: id } });

      // Yeni supplier listesine ekle
      await Supplier.updateMany({ _id: { $in: material.suppliers } }, { $addToSet: { materialsOfSupplied: id } });
    }

    return updatedMaterial;
  }

  public async Delete(id: string): Promise<void> {
    // Material silindiğinde, supplier'ların listesinden de kaldır
    await Supplier.updateMany({ materialsOfSupplied: id }, { $pull: { materialsOfSupplied: id } });

    await this._materialDal.Delete(id);
  }

  public async UpdateStock(
    id: string,
    quantity: number,
    movementType: MaterialMovementTypes
  ): Promise<IMaterial | null> {
    return await this._materialDal.UpdateStock(id, quantity, movementType);
  }

  public async TransferStock(sourceMaterialId: string, targetMaterialId: string, quantity: number): Promise<void> {
    await this._materialDal.UpdateStock(sourceMaterialId, quantity, MaterialMovementTypes.OUT);
    await this._materialDal.UpdateStock(targetMaterialId, quantity, MaterialMovementTypes.IN);
  }
}

// import { inject, injectable } from "tsyringe";
// import IMaterialDal from "../../DataAccess/Abstract/IMaterialDal";
// import IMaterial from "../../Entities/Abstract/IMaterial";
// import IMaterialService from "../Abstract/IMaterialService";
// import TYPES from "../../Api/IoC/ContainerTypes";
// import { FilterQuery } from "mongoose";
// import IProduct from "../../Entities/Abstract/IProduct";
// import { MaterialMovementTypes } from "../../Utilities/Enums/Material/materialEnums";

// @injectable()
// export default class MaterialManager implements IMaterialService {
//   constructor(@inject(TYPES.IMaterialDal) private readonly _materialDal: IMaterialDal) {}

//   public async GetAll(filter?: FilterQuery<IProduct>, populateFields?: string[]): Promise<IMaterial[]> {
//     return await this._materialDal.GetAll(filter, populateFields);
//   }

//   public async GetById(id: string, populateFields?: string[]): Promise<IMaterial | null> {
//     return await this._materialDal.GetById(id, populateFields);
//   }

//   public async Create(material: IMaterial): Promise<IMaterial> {
//     return await this._materialDal.Create(material);
//   }

//   public async Update(id: string, material: Partial<IMaterial>): Promise<IMaterial | null> {
//     return await this._materialDal.Update(id, material);
//   }

//   public async Delete(id: string): Promise<void> {
//     await this._materialDal.Delete(id);
//   }

//   public async UpdateStock(id: string, quantity: number, movementType: MaterialMovementTypes): Promise<IMaterial | null> {
//     return await this._materialDal.UpdateStock(id, quantity, movementType);
//   }

//   public async TransferStock(sourceMaterialId: string, targetMaterialId: string, quantity: number): Promise<void> {
//     await this._materialDal.UpdateStock(sourceMaterialId, quantity, MaterialMovementTypes.OUT);
//     await this._materialDal.UpdateStock(targetMaterialId, quantity, MaterialMovementTypes.IN);
//   }
// }
