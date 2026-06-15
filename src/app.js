import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server live on port ${PORT}`);
});
