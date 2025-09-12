// config.js
import express from "express";
import logger from "morgan";
import cors from "cors";

export default (app) => {
  // Trust proxy (if behind a reverse proxy)
  app.set("trust proxy", 1);

  // Enable CORS for your frontend
  app.use(
    cors({
      origin: ["http://localhost:5173"],
    })
  );

  // Logging in development
  app.use(logger("dev"));

  // Parse JSON and URL-encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
