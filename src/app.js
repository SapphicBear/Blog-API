import express from "express";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT | 3000;
const DEFAULT_URI = "/api/v1";
const URI_ENUM = ["/users", "/posts", "/login"];

app.use(express.urlencoded({ extended: true }));

app.use(`${DEFAULT_URI}${URI_ENUM[0]}`, routes.users);
app.use(`${DEFAULT_URI}${URI_ENUM[1]}`, routes.posts);
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
