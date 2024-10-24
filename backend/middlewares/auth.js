import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(404)
          .json({ success: false, message: "Utilisateur non trouvé" });
      }

      next();
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Non autorisé, token invalide" });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Non autorisé, aucun token fourni" });
  }
};
