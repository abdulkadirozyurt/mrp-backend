import express from "express";
import iocContainer from "../../IoC/Container";
import MrpController from "../Controllers/MrpController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { authorize } from "../middlewares/authorize";
import { UserRoles } from "../../../Utilities/Enums/User/UserRoles";

const router = express.Router();
const mrpController = iocContainer.resolve(MrpController);

router.post("/calculate", jwtAuth, authorize([UserRoles.Admin, UserRoles.ProductionPlanner]), mrpController.Calculate);

export default router;
