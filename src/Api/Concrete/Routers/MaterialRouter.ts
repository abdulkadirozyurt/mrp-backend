import express from "express";
import MaterialsController from "../Controllers/MaterialsController";
import MaterialManager from "../../../Business/Concrete/MaterialManager";
import MaterialDal from "../../../DataAccess/Concrete/Mongoose/MaterialDal";
import iocContainer from "../../IoC/Container";

const router = express.Router();

const materialsController = iocContainer.resolve(MaterialsController);

router.get("/", materialsController.GetAll);
router.post("/",materialsController.Create);
router.put("/",materialsController.Update);
router.delete("/",materialsController.Delete);

export default router;
