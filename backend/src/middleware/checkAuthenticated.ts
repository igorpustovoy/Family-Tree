import { Request, Response, NextFunction } from "express";

const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    console.log("Authenticated");
    return next();
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
};

export default checkAuthenticated;
