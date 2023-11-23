const { model, Schema } = require("mongoose");
const Product = require("./productSchema");


const userSchema = new Schema({
    // imageLocation: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdministrator: {
        type: Boolean,
        default: false,
        required: true,
    },
    cart: { // Every User's selected Products
        type: Array,
        default: [],
    },
    orders: { // History of the previous Orders
        type: Array,
        default: [],
    }
});


const User = model("User", userSchema);


module.exports = User;
