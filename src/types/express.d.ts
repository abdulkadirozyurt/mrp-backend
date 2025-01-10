import IUser from "../Entities/Abstract/IUser";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};
