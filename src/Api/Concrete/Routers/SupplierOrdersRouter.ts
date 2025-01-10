import express from "express";
import iocContainer from "../../IoC/Container";
import SupplierOrdersController from "../Controllers/SupplierOrdersController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { authorize } from "../middlewares/authorize";
import { UserRoles } from "../../../Utilities/Enums/User/UserRoles";

const router = express.Router();
const supplierOrdersController = iocContainer.resolve(SupplierOrdersController);

router.get("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.ProcurementManager]), supplierOrdersController.GetAll);
router.post("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.ProcurementManager]), supplierOrdersController.Create);
router.post("/id", jwtAuth, authorize([UserRoles.Admin, UserRoles.ProcurementManager]), supplierOrdersController.GetById);
router.put("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.ProcurementManager]), supplierOrdersController.Update);
router.delete("/", jwtAuth, authorize([UserRoles.Admin]), supplierOrdersController.Delete);

export default router;
