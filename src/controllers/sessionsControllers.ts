import { NextFunction, Request, Response } from "express";
import { User } from "../../types";

export const register = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as User
        res.json({
            statusCode: 201,
            message: `We've sent you a verification code to ${user.email}`
        })
    } catch (error) {
        return next(error)
    }
}

