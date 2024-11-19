import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

console.log("Starting server with config:", {
  CLOUD_NAME,
  API_KEY: API_KEY ? "***" + API_KEY.slice(-4) : "missing",
  API_SECRET: API_SECRET ? "***" + API_SECRET.slice(-4) : "missing",
});

app.get("/api/images/:tag", async (req, res) => {
  const tag = req.params.tag;
  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;

  console.log("\n--- New Request ---");
  console.log("Searching for tag:", tag);
  console.log("Request URL:", url);

  try {
    const response = await axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      data: {
        expression: `tags:${tag}`,
        max_results: 10,
      },
    });

    console.log("Response received from Cloudinary");
    console.log("Status:", response.status);
    console.log("Data:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("\n=== Error Details ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      console.error("Response headers:", error.response.headers);
    }

    res.status(500).json({
      error: "Failed to fetch images",
      details: error.response?.data || error.message,
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
