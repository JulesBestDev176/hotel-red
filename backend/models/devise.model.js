import mongoose from "mongoose";

const deviseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
});

const Devise = mongoose.model("Devise", deviseSchema);

export default Devise;
