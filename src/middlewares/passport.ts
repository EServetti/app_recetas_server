import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as CustomStrategy } from "passport-custom";
import { createService, readByEmailService } from "../services/user.service";
import CustomError from "../utils/customError";
import { User } from "../../types";
import { compareHash } from "../utils/hash";
import { readToken } from "../utils/jwt";
import GoogleTokenStrategy from "passport-google-id-token";
import FacebookTokenStrategy from "passport-facebook-token";
import crypto from "crypto";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const exists = await readByEmailService(email);
        if (exists) {
          const error = new CustomError(
            401,
            "There's already an account with that email."
          );
          throw error;
        }
        const { userName } = req.body;
        const data: User = {
          userName,
          email,
          password,
          registeredWith: "EMAIL",
        };
        const one = await createService(data);
        const { verifyCode } = one;
        return done(null, one);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await readByEmailService(email);
        if (!one || !compareHash(password, one.password)) {
          const error = new CustomError(400, "Invalid credentials.");
          return done(error);
        }
        const user = {
          _id: one._id,
          userName: one.userName,
          email,
          role: one.role,
          recipes: one.recipes,
        };
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "data",
  new CustomStrategy(async (req, done) => {
    try {
      let token = req.signedCookies.token;
      if (!token) {
        const error = new CustomError(400, "Not found token.");
        return done(error);
      }
      token = readToken(token);
      return done(null, token);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  "google",
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
    },
    async (parsedToken, googleId, done) => {
      try {
        const { email, given_name: userName, sub: id } = parsedToken.payload;
        const exists = await readByEmailService(email);
        if (!exists) {
          const one = await createService({
            email,
            userName,
            password: crypto.randomBytes(32).toString("hex"),
            verified: true,
            registeredWith: "GOOGLE",
          });
          return done(null, one);
        }
        if (exists.registeredWith !== "GOOGLE") {
          const error = new CustomError(400, "Invalid credentials.");
          throw error;
        }
        const user = {
          _id: exists._id,
          userName: exists.userName,
          email: exists.email,
          role: exists.role,
          recipes: exists.recipes,
        };
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "facebook",
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const userName = profile.name?.givenName || profile.displayName;
        const id = profile.id;

        if (!email) {
          const error = new CustomError(400, "No email provided by Facebook");
          return done(error, null);
        }

        const exists = await readByEmailService(email);

        if (!exists) {
          const user = await createService({
            email,
            userName,
            password: crypto.randomBytes(32).toString("hex"),
            verified: true,
          });
          return done(null, user);
        }

        if (exists.registeredWith !== "FACEBOOK") {
          const error = new CustomError(400, "Invalid credentials.");
          throw error;
        }

        const user = {
          _id: exists._id,
          userName: exists.userName,
          email: exists.email,
          role: exists.role,
          recipes: exists.recipes,
        };
        return done(null, user);
      } catch (error) {
        console.error("Error en la estrategia Facebook:", error);
        return done(error);
      }
    }
  )
);

export default passport;
