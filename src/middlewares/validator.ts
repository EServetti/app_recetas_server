import { NextFunction, Request, Response } from "express";
import { readToken } from "../utils/jwt";
import CustomError from "../utils/customError"
import { User } from "../../types";

type Role = "PUBLIC" | "USER" | "ADMIN"

const validator = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
          if (allowedRoles.includes("PUBLIC")) {
            return next()
        }
        const token = req.signedCookies.token
        if (!token) {
          const error = new CustomError(403, "First login.")
          throw error
        }
        const user: User = readToken(token)
        if (!allowedRoles.includes(user.role as Role)) {
            const error = new CustomError(403, "Not authorized")
            throw error
          } else {
            req.user = user
            return next()
          }
        } catch (error) {
            return next(error)
        }
    }
}

export default validator