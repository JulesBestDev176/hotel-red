import Devise from "../models/devise.model.js";

// Ajouter directement les devises

export const addDevises = async (req, res) => {
  const devises = [
    { code: "XOF", symbol: "CFA" },
    { code: "EUR", symbol: "€" },
    { code: "USD", symbol: "$" },
  ];

  try {
    // Insérer plusieurs devises
    await Devise.insertMany(devises);
    res
      .status(201)
      .json({ success: true, message: "Devises insérées avec succès !" });
  } catch (error) {
    console.log(`Erreur lors de l'insertion des devises: ${error.message}`);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
