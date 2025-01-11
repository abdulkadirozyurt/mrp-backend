import express from "express";
import iocContainer from "../../IoC/Container";
import MrpController from "../Controllers/MrpController";

const router = express.Router();
const mrpController = iocContainer.resolve(MrpController);

router.post("/calculate", mrpController.Calculate);

export default router;


