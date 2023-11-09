const router = require("express").Router();
const loginHandler = require("./endpointsJs/login");
const registerHandler = require("./endpointsJs/register");

router.get("/");


router.post("/users/login", loginHandler);


router.post("/users/register", registerHandler);



module.exports = router;