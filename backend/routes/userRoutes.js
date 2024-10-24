import express from "express";
import {
  signup,
  signin,
  signout,
  getCurrentUser,
  //   sendCodeVerification,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Route pour créer un utilisateur
router.post("/signup", signup);

// Route pour la connexion de l'utilisateur
router.post("/login", signin);

// Route pour la deconnexion de l'utilisateur
router.post("/signout", protect, signout);

// Route pour recuperer  l'utilisateur connecté
router.get("/getUser", protect, getCurrentUser);

// Route pour envoyer code
// router.patch("/sendCode", sendCodeVerification);

export default router;
