import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors"; // Assurez-vous d'importer cors
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import deviseRoutes from "./routes/deviseRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Configuration CORS

const corsOptions = {
  origin: "https://hotel-red-1.onrender.com",
  // origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Méthodes autorisées
  credentials: true, // Si vous utilisez des cookies
};

// Utilisation de CORS
app.use(cors(corsOptions));

// Options de sécurité Helmet
const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://hotel-red-1.onrender.com"],
    },
  },
};

// app.use(helmet(helmetOptions));
app.use(cookieParser());

// Middleware pour traiter les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur !");
});

// Middleware pour servir les fichiers statiques
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Routes API
app.use("/api", userRoutes);
app.use("/api", deviseRoutes);
app.use("/api", hotelRoutes);

// Lancer le serveur
app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(
    `Server started at ${
      process.env.PORT
        ? "http://localhost:" + process.env.PORT
        : "http://localhost:5000"
    }`
  );
});
