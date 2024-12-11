import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import TYPES from "../../IoC/Types";
import IUserService from "../../../Business/Abstract/IUserService";

@injectable()
export default class UsersController {
  constructor(@inject(TYPES.IUserService) private _userService: IUserService) {}

  async GetAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this._userService.GetAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users" });
    }
  }

  async GetById(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    try {
      const user = await this._userService.GetById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user" });
    }
  }

  async Create(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await this._userService.Create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  }

  async Update(req: Request, res: Response): Promise<void> {
    const { id, ...user } = req.body;

    try {
      const updatedUser = await this._userService.Update(id, user);
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  }

  async Delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;

    try {
      await this._userService.Delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  }
}


