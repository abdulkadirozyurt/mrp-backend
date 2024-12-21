import express from "express";
import iocContainer from "../../IoC/Container";
import SuppliersController from "../Controllers/SuppliersController";

const router = express.Router();

const suppliersController = iocContainer.resolve(SuppliersController);

router.get("/", suppliersController.GetAll);
router.post("/", suppliersController.Create);
router.put("/", suppliersController.Update);
router.delete("/", suppliersController.Delete);

export default router;
