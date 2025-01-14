// src/Api/Concrete/Routers/WarehouseRouter.ts
import express from "express";
import iocContainer from "../../IoC/Container";
import WarehousesController from "../Controllers/WarehousesController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { authorize } from "../middlewares/authorize";
import { UserRoles } from "../../../Utilities/Enums/User/UserRoles";

const router = express.Router();
const warehouseController = iocContainer.resolve(WarehousesController);

router.get("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), warehouseController.GetAll);
router.post("/id", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), warehouseController.GetById);
router.post("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), warehouseController.Create);
router.put("/id", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), warehouseController.Update);
router.delete("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), warehouseController.Delete);

export default router;
