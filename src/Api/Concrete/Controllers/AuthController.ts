import TYPES from "../../IoC/ContainerTypes";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import IAuthService from "../../../Business/Abstract/IAuthService";
@injectable()
export default class AuthController {
  constructor(@inject(TYPES.IAuthService) private _authService: IAuthService) {}

  public Register = async (req: Request, res: Response): Promise<void> => {

    try {
      req.body.phoneNumber = req.body.phoneNumber || null; 
      const token = await this._authService.Register(req.body);
      res.status(201).json({ token });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };

  public Login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const token = await this._authService.Login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  };
}
