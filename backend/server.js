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
import fs from "fs"; // Pour vérifier l'existence des fichiers

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Configuration CORS
const corsOptions = {
  origin: "https://hotel-red-1.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
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
      scriptSrc: ["'self'", "https://your-script-source.com"], // Ajoutez d'autres sources si nécessaire
      styleSrc: ["'self'", "https://your-style-source.com"], // Ajoutez d'autres sources si nécessaire
    },
  },
};

app.use(helmet(helmetOptions));
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

// Vérification de l'existence d'une image
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

// Lancer le serveur
app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log("Chemin : " + path.join(__dirname, "public/assets"));
  console.log(
    `Serveur démarré à ${
      process.env.PORT
        ? "http://localhost:" + process.env.PORT
        : "http://localhost:5000"
    }`
  );
});
