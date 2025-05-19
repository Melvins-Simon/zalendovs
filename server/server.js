import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./route.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import "colors";
import { logText } from "./loG.text.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5002",
      "http://localhost:5173",
    ],
  })
);

// Path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) =>
  res.status(200).json({ success: true, message: "OK" })
);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, () => {
      logText();
    });
  } catch (error) {
    console.error("❌ Database connection failed".red, error);
    process.exit(1);
  }
};

startServer();
