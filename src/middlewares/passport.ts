import passport from "passport"
import {Strategy as LocalStrategy} from "passport-local"
import {Strategy as CustomStrategy} from "passport-custom"
import {createService, readByEmailService} from "../services/user.service"
import CustomError from "../utils/customError"
import { User } from "../../types"
import { compareHash } from "../utils/hash"
import { readToken } from "../utils/jwt"

passport.use("register", new LocalStrategy({passReqToCallback:true, usernameField: "email"},
    async (req, email, password, done) => {
        try {
            const exists = await readByEmailService(email)
            if (exists) {
                const error = new CustomError(401, "There's already an account with that email.")
                throw error
            }
            const {userName } = req.body
            const data: User = {
               userName,
               email, 
               password
            } 
            const one = await createService(data)
            const {verifyCode} = one
            return done(null, one)
        } catch (error) {
            return done(error)
        }
}))

passport.use("login", new LocalStrategy({passReqToCallback: true, usernameField: "email"},
    async (req, email, password, done) => {
        try {
            const one = await readByEmailService(email)
            if (!one || !compareHash(password, one.password) ) {
                const error = new CustomError(400, "Invalid credentials.")
                return done(error)
            } 
            const user = {
                _id: one._id,
                userName: one.userName,
                email,
                role: one.role,
                recipes: one.recipes
            }
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

passport.use("data", new CustomStrategy(async (req, done) => {
    try {
        let token = req.signedCookies.token
        if (!token) {
            const error = new CustomError(400, "Not found token.")
            return done(error)
        } 
        token = readToken(token)
        return done(null, token)
    } catch (error) {
        return done(error)
    }
}))

export default passport