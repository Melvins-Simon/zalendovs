import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./route.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import "colors";
import { logText } from "./loG.text.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "server/.env" });
}

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.clientUrl ||
        "https://zalendo-voting-system-b4gheqdgahdqf2gq.eastus-01.azurewebsites.net",
      "http://localhost:5002",
      "http://localhost:5173",
    ],
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api", router);

app.use(express.static(path.join(__dirname, "../client/dist"))); // Serve static files from the React app

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(process.env.port, async () => {
  try {
    logText();
    await mongoose.connect(process.env.mongoUrl);
    console.log("-----✅ Database connected successfully.");
  } catch (error) {
    console.log(error);
  }
});
