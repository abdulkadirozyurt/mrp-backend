import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import IUser from "../../../Entities/Abstract/IUser";

export const jwtAuth: RequestHandler = (req: Request & { user?: IUser }, res: Response, next: NextFunction): void => {
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
    const decoded = jwt.verify(token, secret) as any;
    console.log("Decoded token in jwtAuth:", decoded);

    // req.user'ı ayarla
    req.user = {
      _id: decoded.userId, // Token'daki userId'yi _id olarak eşle
      role: decoded.role, // Token'daki role bilgisi
    } as unknown as IUser; // Tür uyumluluğu sağlamak için cast

    next();
  } catch (error: any) {
    console.error("JWT Error:", error.message);
    res.status(403).json({ message: "Invalid token" });
  }
};




// export const jwtAuth: RequestHandler = (req: Request & { user?: IUser }, res: Response, next: NextFunction): void => {
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
//     console.log("Decoded token in jwtAuth:", decoded);

//     req.user = {
//       _id: decoded._id,
//       role: decoded.role,
//     } as Partial<IUser> as IUser;

//     next();
//   } catch (error: any) {
//     console.error("JWT Error:", error.message); // Hata varsa log'la
//     res.status(403).json({ message: "Invalid token" });
//   }
// };
