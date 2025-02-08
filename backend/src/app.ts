import cors from 'cors';
import express from "express";
import bodyParser from "body-parser";
import currencyRoutes from "./routes/currency.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5174',  // Allow requests only from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/v1/currency", currencyRoutes);

//TODO  Rate Limit

// Health check route
app.get("/api/", (req, res) => {
    res.send("API is running!");
});

// Error handler
app.use(errorHandler);

export default app;
