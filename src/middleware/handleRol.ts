import { HttpRequest } from "@/types/HttpRequest";
import { Request, Response } from "express";


export const handleRol = (...rolesAllowed: string[]) => {
  return (req: HttpRequest, res: Response, next: any) => {
    if (!req.user || !rolesAllowed.includes(req.user.rol)) {
      return res.status(403).json({ message: "User not authorized." });
    }
    next();
  };
};
