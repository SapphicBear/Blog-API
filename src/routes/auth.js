import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = Router();
router.post("/login", function (req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: "Something is not right",
                user: user,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed json web token
            const token = jwt.sign(user, "SECRET");
            return res.json({ user, token });
        });
    })(req, res);
});
