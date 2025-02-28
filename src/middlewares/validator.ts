import { NextFunction, Request, Response } from "express";
import { readToken } from "../utils/jwt";
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
          res.json({
            statusCode: 403,
            message: "First login."
          })
        }
        const user: User = readToken(token)
        if (!allowedRoles.includes(user.role as Role)) {
            res.json({
              statusCode: 403,
              message: "Not authorized"
            })
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