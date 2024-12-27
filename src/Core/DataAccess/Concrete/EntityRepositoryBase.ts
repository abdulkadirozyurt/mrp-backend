import { Document, FilterQuery, Model } from "mongoose";
import IModel from "../../Entities/Abstract/IModel";
import IEntityRepository from "../Abstract/IEntityRepository";

export default class EntityRepositoryBase<TModel extends IModel & Document>
  implements IEntityRepository<TModel>
{
  private readonly _model: Model<TModel>;

  constructor(model: Model<TModel>) {
    this._model = model;
  }

  async GetAll(filter?: any, populateFields?: string[]): Promise<TModel[]> {
    let query = this._model.find(filter);
    if (populateFields) {
      populateFields.forEach((field) => {
        query = query.populate(field);
      });
    }
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

  async Create(entity: TModel): Promise<TModel> {
    const createdEntity = new this._model(entity);
    return await createdEntity.save();
  }

  async Update(id: string, entity: Partial<TModel>): Promise<TModel | null> {
    return await this._model.findByIdAndUpdate(id, entity, { new: true }).exec();
  }

  async Delete(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id).exec();
  }
}
