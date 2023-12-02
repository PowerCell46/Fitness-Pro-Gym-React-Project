const router = require("express").Router();
const fs = require("fs");
const getHighlightHandler = require("./endpointsJs/highlights/getHighlight");
const getHighlightsHandler = require("./endpointsJs/highlights/getHighlights");
const getProductHandler = require("./endpointsJs/products/getProduct");
const getProductsHandler = require("./endpointsJs/products/getProducts");
const getProductsMachinesHandler = require("./endpointsJs/products/getProductsMachines");
const getProductsMerchandiseHandler = require("./endpointsJs/products/getProductsMerchandise");
const getProductsSupplementsHandler = require("./endpointsJs/products/getProductsSupplements");
const getTrainersHandler = require("./endpointsJs/trainers/getTrainers");
const likeHighlightHandler = require("./endpointsJs/highlights/likeHighlight");
const loginHandler = require("./endpointsJs/authentication/login");
const { postHighlightHandler } = require("./endpointsJs/highlights/postHighlight");
const postProductHandler = require("./endpointsJs/products/postProduct");
const postTrainerHandler = require("./endpointsJs/trainers/postTrainer");
const registerHandler = require("./endpointsJs/authentication/register");
const multer = require('multer');
const membershipsHandler = require("./endpointsJs/products/memberships");
const buyProductHandler = require("./endpointsJs/products/buyProductHandler");
const checkoutHandler = require("./endpointsJs/orders&checkout/checkout");
const checkoutRemoveProductHandler = require("./endpointsJs/orders&checkout/checkoutRemoveProduct");
const finishOrderHandler = require("./endpointsJs/orders&checkout/finishOrder");
const getUserHighlightsHandler = require("./endpointsJs/highlights/getUserHighlights");
const getOrdersHandler = require("./endpointsJs/orders&checkout/orders");
const postProfilePhotoHandler = require("./endpointsJs/authentication/postProfilePhoto");
const getProfilePhoto = require("./endpointsJs/authentication/getProfilePhoto");
const deleteProductHandler = require("./endpointsJs/products/deleteProduct");
const deleteHighlight = require("./endpointsJs/highlights/deleteHighlight");
const editHighlight = require("./endpointsJs/highlights/editHighlight");
const editProductHandler = require("./endpointsJs/products/editProduct");
const getNumberOfCartProducts = require("./endpointsJs/authentication/getNumberOfCartProducts");


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


router.post("/users/orders", getOrdersHandler);


router.post("/users/getProfilePhoto", getProfilePhoto);


router.post("/users/getNumberOfCartProducts", getNumberOfCartProducts);


router.post("/profilePhotos", upload.single("image"), postProfilePhotoHandler);





router.get("/highlights", getHighlightsHandler);

router.post('/highlights', upload.single("image"), postHighlightHandler);

router.post("/highlights/myhighlights", getUserHighlightsHandler);



router.get("/highlights/:highlightId", getHighlightHandler);

router.post('/highlights/edit/:highlightId', upload.single("image"), editHighlight);


router.post("/highlights/delete/:highlightId", deleteHighlight);

router.post("/highlights/like/:highlightId", likeHighlightHandler);





router.get("/trainers", getTrainersHandler);

router.post("/trainers", upload.single("image"), postTrainerHandler);




router.get("/products", getProductsHandler);

router.get("/products/supplements", getProductsSupplementsHandler);

router.get("/products/machines", getProductsMachinesHandler);

router.get("/products/merchandise", getProductsMerchandiseHandler);


router.get("/products/:productId", getProductHandler);

router.post("/products", upload.single("image"), postProductHandler);


router.post("/products/buy/:productId", buyProductHandler);

router.get("/products/delete/:productId", deleteProductHandler);

router.post("/products/edit/:productId", upload.single("image"), editProductHandler);


router.post("/memberships/:type/:category", membershipsHandler);



router.post("/checkout", checkoutHandler);

router.post("/checkout/removeProduct", checkoutRemoveProductHandler);

router.post("/checkout/finishOrder", finishOrderHandler);



module.exports = router;