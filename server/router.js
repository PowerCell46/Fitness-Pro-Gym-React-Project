const router = require("express").Router();
const fs = require("fs");
const getHighlightHandler = require("./endpointsJs/getHighlight");
const getHighlightsHandler = require("./endpointsJs/getHighlights");
const getProductHandler = require("./endpointsJs/getProduct");
const getProductsHandler = require("./endpointsJs/getProducts");
const getProductsMachinesHandler = require("./endpointsJs/getProductsMachines");
const getProductsMerchandiseHandler = require("./endpointsJs/getProductsMerchandise");
const getProductsSupplementsHandler = require("./endpointsJs/getProductsSupplements");
const getTrainersHandler = require("./endpointsJs/getTrainers");
const likeHighlightHandler = require("./endpointsJs/likeHighlight");
const loginHandler = require("./endpointsJs/login");
const { postHighlightHandler } = require("./endpointsJs/postHighlight");
const postProductHandler = require("./endpointsJs/postProduct");
const postTrainerHandler = require("./endpointsJs/postTrainer");
const registerHandler = require("./endpointsJs/register");
const multer = require('multer');
const membershipsHandler = require("./endpointsJs/memberships");
const buyProductHandler = require("./endpointsJs/buyProductHandler");
const checkoutHandler = require("./endpointsJs/checkout");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Extract the route path to determine the type of entity
    const routePath = req.route.path;
    const entityType = routePath.split("/")[1]; // Assuming your routes are structured like '/entityType/...'

    // Set the destination path dynamically
    const destinationPath = `images/${entityType}/`;

    // Create the subfolder if it doesn't exist
    fs.mkdirSync(destinationPath, { recursive: true });

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


router.get("/");


router.post("/users/login", loginHandler);


router.post("/users/register", registerHandler);



router.get("/highlights", getHighlightsHandler);

router.post('/highlights', upload.single("image"), postHighlightHandler);



router.get("/highlights/:highlightId", getHighlightHandler);


router.post("/highlights/like/:highlightId", likeHighlightHandler);



router.get("/trainers", getTrainersHandler);

router.post("/trainers", upload.single("image"), postTrainerHandler);



router.get("/products", getProductsHandler);

router.get("/products/supplements", getProductsSupplementsHandler);

router.get("/products/machines", getProductsMachinesHandler);

router.get("/products/merchandise", getProductsMerchandiseHandler);

router.post("/products", upload.single("image"), postProductHandler);

router.get("/products/:productId", getProductHandler);


router.post("/products/buy/:productId", buyProductHandler);


router.post("/memberships/:type/:category", membershipsHandler);


router.post("/checkout", checkoutHandler);



module.exports = router;