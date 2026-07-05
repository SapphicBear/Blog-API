import cors from "cors";
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ["http://localhost:3000"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
};
export { cors, corsOptions };
