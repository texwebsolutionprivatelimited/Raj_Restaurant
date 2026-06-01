const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// API placeholder route
app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    message: "Raj Restaurant Backend Server is running.",
    timestamp: new Date(),
  });
});

// Serve frontend assets in production mode
const isProduction = process.env.NODE_ENV === "production" || process.argv.includes("--prod");

if (isProduction) {
  const distPath = path.join(__dirname, "dist");
  
  // Serve static compiled Vite files
  app.use(express.static(distPath));

  // Client-side routing catch-all fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // In development, let user know the dev environment is active
  app.get("/", (req, res) => {
    res.send(
      `<h1>Raj Restaurant Backend - Dev Mode</h1>
       <p>The frontend is running on Vite dev server (usually <a href="http://localhost:5173">http://localhost:5173</a>).</p>
       <p>Backend Status API is online at <a href="/api/status">/api/status</a>.</p>`
    );
  });
}

// Start Listening
app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Environment: ${isProduction ? "PRODUCTION" : "DEVELOPMENT"}`);
  console.log(`=============================================`);
});
