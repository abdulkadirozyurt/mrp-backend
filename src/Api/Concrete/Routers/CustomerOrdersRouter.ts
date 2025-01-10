import express from "express";
import iocContainer from "../../IoC/Container";
import CustomerOrdersController from "../Controllers/CustomerOrdersController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { authorize } from "../middlewares/authorize";
import { UserRoles } from "../../../Utilities/Enums/User/UserRoles";

const router = express.Router();
const customerOrdersController = iocContainer.resolve(CustomerOrdersController);

router.get("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), customerOrdersController.GetAll);
router.post("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.SalesStaff]), customerOrdersController.Create);
router.post("/id", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager, UserRoles.User]), customerOrdersController.GetById);
router.put("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), customerOrdersController.Update);
router.delete("/", jwtAuth, authorize([UserRoles.Admin]), customerOrdersController.Delete);

export default router;
