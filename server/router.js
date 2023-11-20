const router = require("express").Router();
const getHighlightsHandler = require("./endpointsJs/getHighlights");
const loginHandler = require("./endpointsJs/login");
const { postHighlightHandler } = require("./endpointsJs/postHighlight");
const registerHandler = require("./endpointsJs/register");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// subfolders for the different kinds of uploads

router.get("/");


router.post("/users/login", loginHandler);


router.post("/users/register", registerHandler);


router.get("/highlights", getHighlightsHandler);

router.post('/highlights', upload.single("image"), postHighlightHandler);


module.exports = router;