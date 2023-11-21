const { model, Schema } = require("mongoose");


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
        required: true
    }
});


const User = model("User", userSchema);


module.exports = User;
