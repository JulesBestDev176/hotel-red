// middlewares/upload.js

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/assets/images/hotel"); // chemin local sur le serveur
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Renomme le fichier avec un timestamp
  },
});

// const upload = multer({ storage });
const upload = multer({ storage });

// export default upload;
export default upload;
