const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadImage , getImage } = require("../controllers/uploadController");

const router = express.Router();

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


// route
router.post("/upload", upload.single("image"), uploadImage);
router.get("/image/:filename", getImage);

module.exports = router;