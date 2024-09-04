import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
//import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { /*createHash,*/ verifyHash } from "../utils/hash.util.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
//import usersManager from "../data/mongo/manager/UsersManager.mongo.js";
import { createToken } from "../utils/token.util.js"
import usersRepository from "../repositories/users.rep.js";
import UsersDTO from "../dto/users.dto.js";
//import crypto from "crypto";
import sendEmail from "../utils/mailing.util.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

//Hay que modificar ciertas cosas para que se ajusten al trabajo de las capas
passport.use("register", new LocalStrategy (
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            if (!email || !password) {
                const error = new Error("Please enter email and password")
                error.statusCode = 401;
                return done(null, null, error);
            }
            let one = await usersRepository.readByEmailRepository(email);
            if (one) {
                const error = new CustomError(errors.authRegister); // Implementación CustomError y Diccionario de errores
                return done(error);
            }
            const data = new UsersDTO(req.body);
            one = await usersRepository.createRepository(data);
            await sendEmail({ to: email, code: one.verifyCode})
            return done(null, one);
        } catch (error) {
            return done (error);
        }
    }
));

passport.use("login", new LocalStrategy (
    { passReqToCallback: true, usernameField: "email"},
    async (req, email, password, done) => {
        try {
            const one = await usersRepository.readByEmailRepository(email);
            if (!one) {
                const error = new Error("Bad auth from login");
                error.statusCode = 400;
                return done (error);
            }
            const verifyPass = verifyHash(password, one.password);
            console.log(verifyPass);
            const verifyAccount = one.verify
            console.log(verifyAccount);
            if (!verifyPass && !verifyAccount) {
                const error = new Error("Invalid credentials");
                error.statusCode = 400;
                return done (error);
            }
            const token = createToken({ email, role: one.role, photo: one.photo, _id: one._id, online: true});
            req.token = token
            return done(null, one)
        } catch (error) {
            return done (error);
        }
    }
));


//Esto ya no debe ocupar más sessions
/*passport.use("google", new GoogleStrategy(
    { clientID: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET, callbackURL: "http://localhost:8080/api/sessions/google/callback", passReqToCallback: true},
    async (req, accesToken, refreshToken, profile, done) => {
        try {
            const {id, picture} = profile
            console.log(profile);
            let user = await usersManager.readByEmail(id)
            if (!user) {
                user = {
                    email: id,
                    password: createHash(id),
                    photo: picture,
                };
                user = await usersManager.create(user)
            }
            req.session.email = user.email;
            req.session.role = user.role;
            req.session.photo = user.photo;
            req.session.online = true;
            req.session.user_id = user._id;
            return done(null, user)
        } catch (error) {
            return done (error);
        }
    }
))*/

passport.use("jwt", new JWTStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
        secretOrKey: process.env.SECRET_JWT
    },
    (data, done) => {
        try {
            if (data) {
                //console.log("JWT Data:", data);
                return done(null, data)
            } else {
                const error = new Error("forbidden from jwt");
                error.statusCode = 403;
                return done (error);
            }
        } catch (error) {
            return done(error)
        }
    }
))

export default passport;