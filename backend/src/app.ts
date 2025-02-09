import cors from 'cors';
import csrf from 'csurf';
import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import currencyRoutes from "./routes/currency.routes";
import tokenRoutes from "./routes/token.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Enable CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://frontend-domain.com' : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// CSRF protection middleware
const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        sameSite: 'strict',
    },
});
app.use(csrfProtection);

// Routes
app.use("/api/v1/token", tokenRoutes);
app.use("/api/v1/currency", csrfProtection, currencyRoutes);

// Health check route
app.get("/api/", (req, res) => {
    res.send("API is running!");
});

// Error handler
app.use(errorHandler);

export default app;
