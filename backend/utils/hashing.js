import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createHmac } from "crypto";

export const hashPassword = async (value, saltValue) => {
  const result = await bcrypt.hash(value, saltValue);
  return result;
};

export const comparePassword = async (value, hashedValue) => {
  const result = await bcrypt.compare(value, hashedValue);
  return result;
};

export const hmacProcess = (value, key) => {
  const result = createHmac("sha256", key, value).updateValue.digest("hex");
  return result;
};
