import { inject, injectable } from "tsyringe";
import IAuthService from "../Abstract/IAuthService";
import IUser from "../../Entities/Abstract/IUser";
import TYPES from "../../Api/IoC/ContainerTypes";
import IUserDal from "../../DataAccess/Abstract/IUserDal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@injectable()
export default class AuthManager implements IAuthService {
  constructor(@inject(TYPES.IUserDal) private _userDal: IUserDal) {}

  private async GenerateEmployeeCode(): Promise<string> {
    const users = await this._userDal.GetAll();
    if (users.length === 0) {
      return "EMP-0001";
    }
    const lastUser = users.sort((a, b) => (a.employeeCode > b.employeeCode ? -1 : 1))[0];

    const lastCode = lastUser.employeeCode;
    const codeNumber = parseInt(lastCode.split("-")[1]) + 1;
    return `EMP-${codeNumber.toString().padStart(4, "0")}`;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    return passwordRegex.test(password);
  }

  public async Register(user: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }): Promise<string> {
    if (!this.validateEmail(user.email)) {
      throw new Error("Invalid email format");
    }
    if (!this.validatePassword(user.password)) {
      throw new Error("Password must be at least 8 characters long and contain a number");
    }

    const existingUser = await this._userDal.FindByEmail(user.email);
    if (existingUser) {
      throw new Error("User already in use");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser: Partial<IUser> = {
      ...user,
      password: hashedPassword,
      role: "user",
      department: "",
      position: "",
      address: "",
      phoneNumber: "",
      employeeCode: await this.GenerateEmployeeCode(),
    };
    const createdUser = await this._userDal.Create(newUser as IUser);
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(
      { userId: createdUser.id, role: createdUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  }

  public async Login(email: string, password: string): Promise<string> {
    const user = await this._userDal.FindByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }
}
