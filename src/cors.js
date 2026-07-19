import cors from "cors";
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ["http://localhost:8080"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    preflightContinue: true,
    maxAge: 86400,
};
export { cors, corsOptions };
