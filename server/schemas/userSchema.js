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
    // profilePicture: {
    //     type: Buffer,
    //     required: true,
    // },
    isAdministrator: {
        type: Boolean,
        default: false,
        required: true
    }

});


const User = model("User", userSchema);


module.exports = User;
