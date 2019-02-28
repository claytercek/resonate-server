const express = require('express');
const userCtrl = require('../controllers/user.controller');
const multer = require('multer')
var path = require("path");
const router = express.Router();


const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage })


router.post('/upload', upload.single('photo'), (req, res) => {
	if (!req.file) {
    console.log("No file received");
    res.status(500).json({
			message: 'no file received',
		})

  } else {
    console.log('file received');
    console.log(req.file)
    res.status(200).json({
			message: 'success!',
			image_url: "image/" + req.file.filename
		})
  }
  
});

router.get("/:image", (req, res) => {
  res.sendFile(path.join(__dirname, "../images/", req.params.image));
});

module.exports = router;