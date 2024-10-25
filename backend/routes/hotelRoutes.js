import express from "express";
import {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";
import { protect } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Route pour créer un hotel
router.post("/addHotel", protect, upload.single("image"), createHotel);
// Route pour lister tous les hotels
router.get("/hotels", protect, getHotels);
// Route pour afficher un hotel
router.get("/hotel", protect, getHotel);
// Route pour modifier un hotel
router.put("/updateHotel", protect, updateHotel);
// Route pour supprimer un hotel
router.delete("/deleteHotel", protect, deleteHotel);

export default router;
