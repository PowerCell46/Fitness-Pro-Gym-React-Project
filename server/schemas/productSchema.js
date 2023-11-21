const { model, Schema } = require("mongoose");


const productSchema = new Schema({
    imageLocation: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});


const Product = model("Product", productSchema);


module.exports = Product;