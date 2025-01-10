import express from "express";
import iocContainer from "../../IoC/Container";
import CustomersController from "../Controllers/CustomersController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { authorize } from "../middlewares/authorize";
import { UserRoles } from "../../../Utilities/Enums/User/UserRoles";

const router = express.Router();
const customersController = iocContainer.resolve(CustomersController);
console.log(customersController);


router.get("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), customersController.GetAll);
router.post("/id", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), customersController.GetById);
router.post("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), customersController.Create);
router.put("/", jwtAuth, authorize([UserRoles.Admin]), customersController.Update);
router.delete("/", jwtAuth, authorize([UserRoles.Admin]), customersController.Delete);

export default router;
