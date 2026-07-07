import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "./../passport.js";
import "dotenv/config";

const router = Router();
router.post("/", function (req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : "Something is not right",
                user: user,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed json web token
            const token = jwt.sign(user, process.env.SECRET);
            return res.json({ user, token });
        });
    })(req, res);
});
export default router;
