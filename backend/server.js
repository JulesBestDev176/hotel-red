import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import deviseRoutes from "./routes/deviseRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "https://hotel-red-1.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Use CORS
app.use(cors(corsOptions));

// Security Headers with Helmet
app.use(helmet());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// API Routes
app.use("/api", userRoutes);
app.use("/api", deviseRoutes);
app.use("/api", hotelRoutes);

// Check for image existence
app.get("/check-image/:imageName", (req, res) => {
  const { imageName } = req.params;
  const filePath = path.join(
    __dirname,
    "public/assets/images/hotel",
    imageName
  );

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Image non trouvée");
    }
    res.send("Image existe");
  });
});

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur !");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log("Chemin : " + path.join(__dirname, "public/assets"));
  console.log(`Serveur démarré à http://localhost:${PORT}`);
});
