const { model, Schema } = require("mongoose");


const userSchema = new Schema({
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
    imageLocation: {
        type: String,
        default: "images/profilePhotos/blank-avatar-photo-place-holder-600nw-1095249842.png",
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
