import express from "express";
import "dotenv/config";
import routes from "./routes/index.js";
import models from "./models/index.js";
const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.urlencoded({ extended: true }));

app.use(`${models.uri.DEFAULT_URI}${models.uri.URI_ENUM[0]}`, routes.users);
app.use(`${models.uri.DEFAULT_URI}${models.uri.URI_ENUM[1]}`, routes.posts);

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
