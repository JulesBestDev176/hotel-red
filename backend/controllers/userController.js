import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { signupSchema, signinSchema } from "../middlewares/validators.js";
import {
  comparePassword,
  hashPassword,
  hmacProcess,
} from "../utils/hashing.js";
import { transporter } from "../middlewares/sendMail.js";

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

// Envoie de code de verification

// export const sendCodeVerification = async (res, req) => {
//   console.log(req.body);
//   const { email } = req.body;

//   try {
//     if (!email) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Veuillez remplir tous les champs" });
//     }

//     const userExist = await User.findOne({ email }).select("+password");
//     if (!userExist) {
//       return res
//         .status(401)
//         .json({ success: false, message: "L'utilisateur non trouvé." });
//     }

//     const code = Math.floor(Math.random() * 1000000).toString();
//     let info = await transporter.sendMail({
//       from: process.env.NODE_CODE_SENDING_MAIL_ADDRESS,
//       to: userExist.email,
//       subject: "Code de vérification",
//       html: "<h1>" + code + "</h1>",
//     });

//     if (info.accepted[0] === userExist.email) {
//       const hashedCode = hmacProcess(
//         code,
//         process.env.HMAC_VERIFICATION_CODE_SECRET
//       );
//       userExist.forgotPasswordCode = hashedCode;
//       await userExist.save();
//       return res.status(200).json({ success: true, message: "Code envoyé" });
//     }
//     res.status(400).json({ success: false, message: "Code non envoyé" });
//   } catch (error) {}
// };

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
