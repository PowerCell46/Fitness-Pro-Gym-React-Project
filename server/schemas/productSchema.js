const { model, Schema } = require("mongoose");


const productSchema = new Schema({
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
    },
    productImage: {
        type: Buffer, // Or Image URL A.K.A. String
        required: true,
    }

});


const Product = model("Product", productSchema);


module.exports = Product;