import IEntityRepository from "../../Core/DataAccess/Abstract/IEntityRepository";
import IInventoryMovement from "../../Entities/Abstract/IInventoryMovement";

export default interface IInventoryMovementDal extends IEntityRepository<IInventoryMovement> {}
