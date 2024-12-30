import { injectable } from "tsyringe";
import IInventoryMovementDal from "../../Abstract/IInventoryMovementDal";
import IInventoryMovement from "../../../Entities/Abstract/IInventoryMovement";
import { InventoryMovement } from "../../../Entities/Concrete/InventoryMovement";
import EntityRepositoryBase from "../../../Core/DataAccess/Concrete/EntityRepositoryBase";


@injectable()
export default class InventoryMovementDal extends EntityRepositoryBase<IInventoryMovement> implements IInventoryMovementDal {
    constructor(){
        super(InventoryMovement);
    }
}
