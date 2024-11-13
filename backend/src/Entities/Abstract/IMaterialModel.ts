import IModel from "../../Core/Entities/Abstract/IModel";

export default interface IMaterialModel extends IModel ,Document{
  name: string;
  stockAmount: number;
  unitType: string;
}
