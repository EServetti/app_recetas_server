import { NextFunction, Request, Response } from "express";
import { readToken } from "../utils/jwt";
import CustomError from "../utils/customError"

type Role = "PUBLIC" | "USER" | "ADMIN"

const validator = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
          if (allowedRoles.includes("PUBLIC")) {
            return next()
        }
        const token = req.cookies["token"]
        const user = readToken(token)
        if (!allowedRoles.includes(user.role)) {
            const error = new CustomError(403, "Not authorized")
            throw error
          }
        } catch (error) {
            return next(error)
        }
    }
}

export default validator