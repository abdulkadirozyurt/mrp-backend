import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../../../Utilities/Enums/User/UserRoles";

// export const authorize = (allowedRoles: UserRoles[]) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const userRole = req.user?.role;
//     if (!userRole || !allowedRoles.includes(userRole as UserRoles)) {
//       res.status(403).json({ message: "Unauthorized" });
//       return;
//     }
//     next();
//   };
// };

//

export const authorize = (allowedRoles: UserRoles[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole as UserRoles)) {
      console.error("Authorization Error: User role is not authorized.");
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    next();
  };
};
