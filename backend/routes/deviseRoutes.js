import express from "express";
import { addDevises } from "../controllers/deviseController.js";

const router = express.Router();

// Route pour ajouter tous les devises
router.post("/device", addDevises);

export default router;
