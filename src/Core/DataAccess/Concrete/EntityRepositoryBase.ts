import mongoose, { Document, Model } from "mongoose";
import IModel from "../../Entities/Abstract/IModel";
import IEntityRepository from "../Abstract/IEntityRepository";

export default class EntityRepositoryBase<TModel extends IModel & Document> implements IEntityRepository<TModel> {
  private readonly _model: Model<TModel>;

  constructor(model: Model<TModel>) {
    this._model = model;
  }

  async GetAll(filter?: any, populateFields?: string[]): Promise<TModel[]> {
    let query = this._model.find(filter).populate("billOfMaterials.material");
    // if (populateFields) {
    //   populateFields.forEach(field => {
    //     query = query.populate("billOfMaterials.material");
    //   });
    // }
    return await query.exec();
  }

  async GetById(id: string, populateFields?: string[]): Promise<TModel | null> {
    let query = this._model.findById(id);
    if (populateFields) {
      populateFields.forEach((field) => {
        query = query.populate(field);
      });
    }
    return await query.exec();
  }

  async Create(entity: TModel): Promise<string> {
    const createdEntity = new this._model(entity);
    const result = await createdEntity.save();
    return result.id;
  }

  async Update(id: string, entity: Partial<TModel>): Promise<void> {
    await this._model.findOneAndUpdate({ _id: id }, entity).exec();
  }

  async Delete(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id).exec();
  }
}
