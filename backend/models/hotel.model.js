import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
      unique: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    devise: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
