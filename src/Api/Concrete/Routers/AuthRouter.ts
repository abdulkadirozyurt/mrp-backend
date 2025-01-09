import express from "express";
import iocContainer from "../../IoC/Container";
import AuthController from "../Controllers/AuthController";

const router = express.Router();
const authController = iocContainer.resolve(AuthController);

router.post("/register", authController.Register);
router.post("/login", authController.Login);

export default router;



