import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import IUser from "../../../Entities/Abstract/IUser";

// export const jwtAuth: RequestHandler = (
//   req: Request & { user?: IUser },
//   res: Response,
//   next: NextFunction
// ): void => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     res.status(401).json({ message: "Token is missing" });
//     return;
//   }
//   try {
//     const secret = process.env.JWT_SECRET;
//     if (!secret) {
//       throw new Error("JWT_SECRET is not defined");
//     }
//     const decoded = jwt.verify(token, secret) as IUser;
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(403).json({ message: "Invalid token" });
//   }
// };



export const jwtAuth: RequestHandler = (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token is missing" });
    return;
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, secret) as IUser;
    console.log("Decoded JWT Payload:", decoded); // Log kullanıcı bilgilerini
    req.user = decoded;
    next();
  } catch (error : any) {
    console.error("JWT Error:", error.message); // Hata varsa log'la
    res.status(403).json({ message: "Invalid token" });
  }
};
