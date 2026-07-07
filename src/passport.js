import passport from "passport";
import "dotenv/config";
import LocalStrategy from "passport-local";
import { prisma } from "./../lib/prisma.js";
import bcrypt from "bcryptjs";
import passportJWT from "passport-jwt";
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async function (email, password, cb) {
            try {
                const user = await prisma.user.findUnique({
                    where: { email: email },
                });
                if (!user) {
                    return cb(null, false, {
                        message: "Wrong password or email",
                    });
                }
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return cb(null, false, { message: "Wrong password" });
                }
                return cb(null, user, {
                    message: "Logged in successfully",
                });
            } catch (err) {
                return cb(err);
            }
        }
    )
);
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        },
        function (jwtPayload, cb) {
            return prisma.user
                .findUnique({ where: { id: jwtPayload.id } })
                .then((user) => {
                    if (!user) {
                        return cb(false, null, { message: "User not found" });
                    }
                    return cb(null, user);
                })
                .catch((err) => {
                    return cb(err);
                });
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
export default passport;
