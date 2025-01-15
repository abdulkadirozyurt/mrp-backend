import express from "express";
import iocContainer from "../../IoC/Container";
import SuppliersController from "../Controllers/SuppliersController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { authorize } from "../middlewares/authorize";
import { UserRoles } from "../../../Utilities/Enums/User/UserRoles";

const router = express.Router();
const suppliersController = iocContainer.resolve(SuppliersController);

router.get("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), suppliersController.GetAll);
router.post("/", jwtAuth, authorize([UserRoles.Admin]), suppliersController.Create);
router.put("/", jwtAuth, authorize([UserRoles.Admin]), suppliersController.Update);
router.delete("/", jwtAuth, authorize([UserRoles.Admin]), suppliersController.Delete);
// router.post("/materials", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), suppliersController.GetByMaterial);
router.post("/suppliers-by-material", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), suppliersController.GetSuppliersByMaterial);

export default router;
