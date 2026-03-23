const path = require("path");

const uploadImage = (req, res) => {
  try {
    res.status(200).json({
      message: "Image uploaded successfully",
      file: req.file
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });
  }
};

//get Image - api/image/:filename
const getImage = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);
  res.sendFile(filePath);
};

module.exports = { uploadImage, getImage };