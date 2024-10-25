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

// Options de configuration CORS
const corsOptions = {
  origin: "https://hotel-red-1.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  credentials: true, // Si vous utilisez des cookies
};

// Utilisation de CORS
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://hotel-red-1.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(helmet());
app.use(cookieParser());
// Middleware pour traiter les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur !");
});
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
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
