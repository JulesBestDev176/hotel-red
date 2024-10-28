// middlewares/upload.js

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/assets/images/hotel");
    console.log("uploadPath : ", uploadPath);
    // Vérifiez si le répertoire existe, sinon créez-le
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// const upload = multer({ storage });
const upload = multer({ storage });

// export default upload;
export default upload;
