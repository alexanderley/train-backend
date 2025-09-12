// app.js
import express from "express";
const app = express();

// Import config (make sure it exports a function)
import setupConfig from "./config/index.js";
setupConfig(app);

// Import all routes
import allRoutes from "./routes/index.js";
app.use("/api", allRoutes);

import trainRoutes from "./routes/train.routes.js";
app.use("/api", trainRoutes);

// Import error handling
import setupErrorHandling from "./error-handling/index.js";
setupErrorHandling(app);

export default app;
