import express from "express";
import "dotenv/config";
import routes from "./routes/index.js";
import models from "./models/index.js";
import { cors, corsOptions } from "./cors.js";
import passport from "./passport.js";
const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
// Handle OPTIONS request preflight
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.use(
    models.uri.USERS_URI,
    passport.authenticate("jwt", { session: false }),
    routes.users
);
app.use(
    models.uri.POSTS_URI,
    passport.authenticate("jwt", { session: false }),
    routes.posts
);
app.use(models.uri.LOGIN_URI, routes.auth);

app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(err.statusCode || 500);
});

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server live on port ${PORT}`);
});
