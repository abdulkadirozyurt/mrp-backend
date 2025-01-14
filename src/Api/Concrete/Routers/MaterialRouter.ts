import express from "express";
import iocContainer from "../../IoC/Container";
import MaterialsController from "../Controllers/MaterialsController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { authorize } from "../middlewares/authorize";
import { UserRoles } from "../../../Utilities/Enums/User/UserRoles";

const router = express.Router();
const materialsController = iocContainer.resolve(MaterialsController);

router.put("/", jwtAuth, authorize([UserRoles.Admin]), materialsController.Update);
router.post("/", jwtAuth, authorize([UserRoles.Admin]), materialsController.Create);
router.delete("/", jwtAuth, authorize([UserRoles.Admin]), materialsController.Delete);
router.get("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.ProductionPlanner]), materialsController.GetAll);
router.post("/id", jwtAuth, authorize([UserRoles.Admin, UserRoles.ProductionPlanner]), materialsController.GetById);
router.post("/transfer", jwtAuth, authorize([UserRoles.Admin, UserRoles.ProductionPlanner]), materialsController.TransferStock);
router.post("/get-suppliers", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), materialsController.GetSuppliersByMaterial);

export default router;
