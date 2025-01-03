import express from "express";
import iocContainer from "../../IoC/Container";
import MaterialsController from "../Controllers/MaterialsController";

const router = express.Router();

const materialsController = iocContainer.resolve(MaterialsController);

router.get("/",  materialsController.GetAll);
router.post("/", materialsController.Create);
router.post("/id", materialsController.GetById);
router.post("/transfer",  materialsController.TransferStock);
router.put("/", materialsController.Update);
router.delete("/", materialsController.Delete);

export default router;
