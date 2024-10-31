import Hotel from "../models/hotel.model.js";
import cloudinary from "../utils/cloudinary.js";
import upload from "../middlewares/upload.js";
// Créer un hotel
export const createHotel = async (req, res) => {
  const hotel = req.body;

  // Validation des champs
  if (
    !hotel.nom ||
    !hotel.email ||
    !hotel.adresse ||
    !hotel.tel ||
    !hotel.prix ||
    !hotel.devise
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Veuillez remplir tous les champs" });
  }

  const result = await cloudinary.uploader.upload(req.file.path);

  // Récupération de l'URL de l'image uploadée sur Cloudinary
  const imageUrl = result.secure_url || ""; // `req.file.path` contient l'URL Cloudinary

  const newHotel = new Hotel({
    nom: hotel.nom,
    email: hotel.email,
    adresse: hotel.adresse,
    tel: hotel.tel,
    prix: hotel.prix,
    devise: hotel.devise,
    image: imageUrl, // Stocke l'URL de l'image Cloudinary
    userId: req.user._id,
  });

  try {
    await newHotel.save();
    res.status(201).json({ success: true, data: newHotel });
    console.log("Image URL:", imageUrl);
  } catch (error) {
    console.log(`Erreur lors de la création de l'hôtel: ${error.message}`);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// Afficher tous les hotels
export const getHotels = async (req, res) => {
  const user = JSON.parse(localStorage.getItem("user")); // Récupérer l'utilisateur connecté
  try {
    const result = await Hotel.find({ userId: user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, message: "hotels", data: result });
  } catch (error) {
    console.log(`Erreur lors de la récupération des hôtels: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Afficher un hotel
export const getHotel = async (req, res) => {
  const { _id } = req.query;
  try {
    const result = await Hotel.findOne({ _id });
    res.status(200).json({ success: true, message: "hotel", data: result });
  } catch (error) {
    console.log(`Erreur lors de la recuperation de l'hotel: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Modifier un hotel
export const updateHotel = async (req, res) => {
  // const hotel = req.body;
  // const { userId } = req.user;
  // if (
  //   !hotel.nom ||
  //   !hotel.email ||
  //   !hotel.adresse ||
  //   !hotel.tel ||
  //   !hotel.prix ||
  //   !hotel.devise ||
  //   !hotel.image
  // ) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Veuillez remplir tous les champs" });
  // }
  // try {
  //   const hotelExist = await Hotel.findOne({ _id });
  //   if (!hotelExist) {
  //     return res
  //       .status(404)
  //       .json({ success: false, message: "Hotel non trouvé" });
  //   }
  //   if (hotelExist.userId.toString() !== userId) {
  //     return res.status(403).json({ success: false, message: "Non authorisé" });
  //   }
  // } catch (error) {
  //   console.log(`Erreur lors de la creation de l'hotel: ${error.message}`);
  //   res.status(500).json({ success: false, message: "Server error" });
  // }
};

// Supprimer un hotel
export const deleteHotel = async (req, res) => {};
