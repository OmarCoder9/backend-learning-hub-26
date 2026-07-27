import { Request, Response, NextFunction } from "express";

const authorizationMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res
        .status(401)
        .json({ status: "Failed", msg: "User not authenticated" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        status: "Failed",
        msg: `Access denied. Only ${allowedRoles.join(", ")} can access this resource`,
      });
    }

    next();
  };
};

export default authorizationMiddleware;
