import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import TYPES from "../../IoC/ContainerTypes";
import IUserService from "../../../Business/Abstract/IUserService";
import { User } from "../../../Entities/Concrete/User";

@injectable()
export default class UsersController {
  constructor(@inject(TYPES.IUserService) private _userService: IUserService) {}

  GetAll = async (req: Request, res: Response) => {
    try {
      const users = await this._userService.GetAll();
      return res.status(200).json({ success: true, message: "All users listed", users: users });
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving users" });
    }
  };

  GetById = async (req: Request, res: Response) => {
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
  };

  Create = async (req: Request, res: Response) => {
    try {
      const newUser = await this._userService.Create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  };

  Update = async (req: Request, res: Response) => {
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
  };

  Delete = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      await this._userService.Delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  };

  getUserProfile = async (req: Request, res: Response) => {
    console.log("User ID in getUserProfile:", req.user?._id);

    try {
      const userId = req?.user?._id; // Token'dan gelen kullanıcı ID'si
      const user = await User.findById(userId).select("-password"); // Şifreyi dışarıda bırakıyoruz

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      return res.status(200).json({ success: true, user: user });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };
}
