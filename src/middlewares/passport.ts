import passport from "passport"
import {Strategy as LocalStrategy} from "passport-local"
import {createService, readByEmailService} from "../services/user.service"
import CustomError from "../utils/customError"
import { User } from "../../types"
import crypto from "crypto"

passport.use("register", new LocalStrategy({passReqToCallback:true, usernameField: "email"},
    async (req, email, password, done) => {
        try {
            const exists = await readByEmailService(email)
            if (exists) {
                const error = new CustomError(401, "There's already an account with that email.")
                throw error
            }
            const {userName } = req.body
            const verifyCode = crypto.randomBytes(6).toString("hex")
            const data: User = {
               userName,
               email, 
               password,
               verified: false,
               verifyCode: verifyCode,
               recipes: [],
               role: "USER"
            } 
            const one = await createService(data)
            return done(null, one)
        } catch (error) {
            return done(error)
        }
}))

export default passport