const router = require("express").Router();
const getHighlightHandler = require("./endpointsJs/getHighlight");
const getHighlightsHandler = require("./endpointsJs/getHighlights");
const getTrainersHandler = require("./endpointsJs/getTrainers");
const likeHighlightHandler = require("./endpointsJs/likeHighlight");
const loginHandler = require("./endpointsJs/login");
const { postHighlightHandler } = require("./endpointsJs/postHighlight");
const postTrainerHandler = require("./endpointsJs/postTrainer");
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



router.get("/highlights/:highlightId", getHighlightHandler);


router.post("/highlights/like/:highlightId", likeHighlightHandler);



router.get("/trainers", getTrainersHandler);

router.post("/trainers", upload.single("image"), postTrainerHandler);



module.exports = router;