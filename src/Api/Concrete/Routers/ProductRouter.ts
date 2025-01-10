import express from "express";
import iocContainer from "../../IoC/Container";
import ProductsController from "../Controllers/ProductsController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { authorize } from "../middlewares/authorize";
import { UserRoles } from "../../../Utilities/Enums/User/UserRoles";

const router = express.Router();
const productsController = iocContainer.resolve(ProductsController);

router.get("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), productsController.GetAll);
router.get("/id", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), productsController.GetById);
router.post("/", jwtAuth, authorize([UserRoles.Admin]), productsController.Create);
router.put("/", jwtAuth, authorize([UserRoles.Admin, UserRoles.Manager]), productsController.Update);
router.delete("/", jwtAuth, authorize([UserRoles.Admin]), productsController.Delete);

export default router;
