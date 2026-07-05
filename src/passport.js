import passport from "passport";
import LocalStrategy from "passport-local";
import { prisma } from "./../lib/prisma.js";
import passportJWT from "passport-jwt";
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        function (email, password, cb) {
            return prisma.user
                .findUnique({ email, password })
                .then((user) => {
                    if (!user) {
                        return cb(null, false, {
                            message: "Incorrect email or password.",
                        });
                    }
                    return cb(null, user, {
                        message: "Logged in successfully",
                    });
                })
                .catch((err) => cb(err));
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "SECRET",
        },
        function (jwtPayload, cb) {
            return prisma.user
                .findUnique(jwtPayload.id)
                .then((user) => {
                    return cb(null, user);
                })
                .catch((err) => {
                    return cb(err);
                });
        }
    )
);
export default passport;
