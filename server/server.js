import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./route.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import "colors";
import { logText } from "./loG.text.js";

// Load environment variables
dotenv.config({ path: "server/.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5002",
  "http://localhost:5173",
  "https://zalendovs-ffcydkb2c9f8dxb4.canadacentral-01.azurewebsites.net",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Routes
app.use("/api", router);

// Static files and SPA fallback
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Server startup
const PORT = process.env.port || 8080; // Azure uses PORT environment variable

const startServer = async () => {
  try {
    await mongoose.connect(process.env.mongoUrl);

    app.listen(PORT, () => {
      logText();
    });
  } catch (error) {
    console.error("❌ Database connection failed".red, error);
    process.exit(1);
  }
};

startServer();
