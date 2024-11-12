import IModel from "../../Core/Entities/Abstract/IModel";

export default interface IMaterialModel extends IModel {
  name: string;
  stockAmount: number;
  unitType: string;
}
