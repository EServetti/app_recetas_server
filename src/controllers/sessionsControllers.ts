import { NextFunction, Request, Response } from "express";
import { User } from "../../types";
import { destroyService, readByEmailService, updateService } from "../services/user.service";
import CustomError from "../utils/customError";
import { createToken } from "../utils/jwt";
import crypto from "crypto"
import { createHash } from "../utils/hash";

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

export const recoveringToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email} = req.params
        const one = await readByEmailService(email)
        if (!one) {
            const error = new CustomError(400, "Invalid credentials.")
            throw error
        }
        const resetPasswordToken = crypto.randomBytes(32).toString("hex")
        const resetPasswordExpires = Date.now() + 3600000
        await updateService(one._id, {resetPasswordToken, resetPasswordExpires})
        // enviar email con resetPasswordToken
        res.json({
            statusCode: 200,
            message: "We've sent you a recovering mail."
        })
    } catch (error) {
        return next(error)
    }
}

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, token} = req.params
        const {password} = req.body
        const one = await readByEmailService(email)

        if (!one || one.resetPasswordToken !== token) {
            const error = new CustomError(400, "Invalid credentials.")
            throw error
        }
        if (!password) {
            const error = new CustomError(400, "Please enter the new password.")
            throw error
        }
        await updateService(one._id, {password: createHash(password)})
        res.json({
            statusCode: 200,
            message: "The password has been reset."
        })
    } catch (error) {
        return next(error)
    }
}

export const destroyAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const one = req.user as User
        if (!one) {
            const error = new CustomError(400, "First Login.")
            throw error
        }
        await destroyService(one._id)
        res.json({
            statusCode: 200,
            message: "The account has been deleted."
        })
    } catch (error) {
        return next(error)
    }
}
