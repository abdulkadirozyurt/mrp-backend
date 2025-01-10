import express from "express";
import iocContainer from "../../IoC/Container";
import AuthController from "../Controllers/AuthController";
import { jwtAuth } from "../middlewares/jwtAuth";

const router = express.Router();
const authController = iocContainer.resolve(AuthController);

router.post("/register", authController.Register);
router.post("/login", authController.Login);
router.post("/logout", jwtAuth, authController.Logout);


export default router;



