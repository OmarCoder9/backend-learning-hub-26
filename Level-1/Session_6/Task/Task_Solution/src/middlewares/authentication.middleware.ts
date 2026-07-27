import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ status: "Failed", msg: "No token provided, authorization required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "ttt");
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        status: "Failed",
        msg: error instanceof Error ? error.message : "Invalid token",
      });
  }
};

export default authMiddleware;
