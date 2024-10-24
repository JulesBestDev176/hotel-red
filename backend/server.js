import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors"; // Assurez-vous d'importer cors
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import deviseRoutes from "./routes/deviseRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";

dotenv.config();

const app = express();

// Options de configuration CORS
const corsOptions = {
  origin: "https://hotel-red-1.onrender.com", // Autoriser cette origine
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  credentials: true, // Si vous utilisez des cookies
};

// Utilisation de CORS
app.use(cors(corsOptions));

app.use(helmet());
app.use(cookieParser());
// Middleware pour traiter les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur !");
});
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
