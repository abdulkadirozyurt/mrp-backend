import mongoose, { Document, Model } from "mongoose";
import IModel from "../../Entities/Abstract/IModel";
import IEntityRepository from "../Abstract/IEntityRepository";

export default class EntityRepositoryBase<TModel extends IModel & Document> implements IEntityRepository<TModel> {
  private readonly _model: Model<TModel>;

  constructor(model: Model<TModel>) {
    this._model = model;
  }

  async GetAll(filter?: any): Promise<TModel[]> {
    return await this._model.find(filter);
  }
  async GetById(id: string): Promise<TModel | null> {
    return await this._model.findById(id);
  }
  async Create(entity: TModel): Promise<string> {
    const createdEntity = new this._model(entity);
    const result = await createdEntity.save();
    return result.id;
  }
  async Update(id: string, entity: Partial<TModel>): Promise<void> {
    await this._model.findOneAndUpdate({ _id: id }, entity);
  }
  async Delete(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id);
  }
}
