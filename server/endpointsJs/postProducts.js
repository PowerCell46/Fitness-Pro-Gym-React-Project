const Product = require("../schemas/productSchema");

async function postProductHandler(req, res) {
    const {name, productType, description, price} = req.body;
    console.log({name, productType, description, price});
    // const product = new Product({});
    // product.save();
}

module.exports = postProductHandler;