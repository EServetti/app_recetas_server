import { NextFunction, Request, Response } from "express";
import { User } from "../../types";
import { readByEmailService, updateService } from "../services/user.service";
import CustomError from "../utils/customError";
import { createToken } from "../utils/jwt";

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

export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, verifyCode} = req.params
        const one = await readByEmailService(email)
        if (one && one.verifyCode === verifyCode) {
            await updateService(one._id, {verified: true})
            res.json({
                statusCode: 200,
                message: "The account has been verified."
            })
        } else {
            const error = new CustomError(400, "Invalid credentials")
            throw error
        }
    } catch (error) {
        return next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = createToken(req.user)
        res.cookie("token",token,{ secure: true, sameSite: "none", signed: true, maxAge: 3600000 }).json({
            statusCode: 200,
            message: "Loged in."
        })
    } catch (error) {
        return next(error)
    }
}

export const userData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({
            statusCode: 200,
            message: req.user
        })
    } catch (error) {
        return next(error)
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("token",{secure: true, sameSite: "none"}).json({
            statusCode: 200,
            message: "Loged out."
        })
    } catch (error) {
        return next(error)
    }
}