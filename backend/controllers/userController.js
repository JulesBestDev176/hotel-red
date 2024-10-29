import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  signupSchema,
  signinSchema,
  changePasswordSchema,
} from "../middlewares/validators.js";
import {
  comparePassword,
  hashPassword,
  hmacProcess,
} from "../utils/hashing.js";
import { transporter } from "../middlewares/sendMail.js";
import nodemailer from "nodemailer";

// Generer token
const generateToken = (id, email, verified) => {
  return jwt.sign(
    {
      id,
      email,
      verified,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
};

// Créer un utilisateur
export const signup = async (req, res) => {
  const user = req.body;

  if (!user.nom || !user.email || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "Veuillez remplir tous les champs" });
  }

  try {
    const { error, value } = signupSchema.validate({
      email: user.email,
      password: user.password,
    });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return res
        .status(401)
        .json({ success: false, message: "L'utilisateur existe déjà" });
    }

    const hashedPassword = await hashPassword(user.password, 12);

    const newUser = new User({
      nom: user.nom,
      email: user.email,
      password: hashedPassword,
      image: user.image,
    });

    const result = await newUser.save();
    result.password = undefined;
    res.status(201).json({
      success: true,
      data: result,
      message: "Compte crée avec succés",
    });
  } catch (error) {
    console.log(
      `Erreur lors de la creation de l'utilisateur: ${error.message}`
    );
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Connexion utilisateur

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Veuillez remplir tous les champs" });
    }

    const { error, value } = signinSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const userExist = await User.findOne({ email }).select("+password");
    if (!userExist) {
      return res
        .status(401)
        .json({ success: false, message: "L'utilisateur non trouvé." });
    }

    const result = comparePassword(password, userExist.password);
    if (!result) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const token = generateToken(
      userExist._id,
      userExist.email,
      userExist.verified
    );

    res
      .cookie("Authorization", "Bearer ", +token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        token: token,
        message: "Connexion réussie",
      });
  } catch (error) {
    console.log(
      `Erreur lors de la connexion de l'utilisateur: ${error.message}`
    );
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// Deconnexion utilisateur
export const signout = async (req, res) => {
  res.clearCookie("Authorization").status(200).json({
    success: true,
    message: "Déconnexion réussie",
  });
};

// Envoie d'email

export const sendMailChangePassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      console.log("veuillez remplir tous les champs");
      return res
        .status(400)
        .json({ success: false, message: "Veuillez remplir tous les champs" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      console.log("l'utilisateur n'existe pas");
      return res
        .status(401)
        .json({ success: false, message: "Utilisateur non trouvé." });
    }

    const resetLink = `http://localhost:3000/authentification/changePassword?email=${encodeURIComponent(
      email
    )}`;

    const info = await transporter.sendMail({
      from: process.env.NODE_CODE_SENDING_MAIL_ADDRESS,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `<p>Bonjour ${userExist.prenom} ${userExist.nom},</p>
             <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    if (info.accepted[0] === userExist.email) {
      return res
        .status(200)
        .json({ success: true, message: "Lien de réinitialisation envoyé." });
      console.log("lien envoye");
    }
    console.log("lien non envoye");
    return res
      .status(500)
      .json({ success: false, message: "Échec de l'envoi de l'e-mail." });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
    res
      .status(500)
      .json({ success: false, message: "Erreur interne du serveur" });
  }
};

// Recuperer user

// Récupérer l'utilisateur connecté
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'utilisateur: ${error.message}`
    );
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// ChangePassword
export const changePassword = async (req, res) => {
  const { password1, password2, email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email manquant dans l'URL" });
  }
  if (!password1 || !password2) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  try {
    const { error, value } = changePasswordSchema.validate({
      password1,
      password2,
    });

    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    if (password1 !== password2) {
      return res.status(401).json({
        success: false,
        message: "Les 2 mots de passe ne sont pas identiques",
      });
    }
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Uilisateur non trouvé" });
    }

    const hashedPassword = await hashPassword(password1, 12);
    existingUser.password = hashedPassword;
    await existingUser.save();
    return res
      .status(200)
      .json({ success: true, message: "Mot de passe modifie avec succées" });
  } catch (error) {
    console.log(error);
  }
};
