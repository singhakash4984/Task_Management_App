import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    const [schema , token] = authHeader?.split(" ") ?? [];
    if ( schema !== 'Bearer' || !token) {
      return res.status(401).json({ message: "No token provided" });
    }
  try {
      
    const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET!,{algorithms:['HS256']}) as {
      id: string;
      role: string;
    };
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
