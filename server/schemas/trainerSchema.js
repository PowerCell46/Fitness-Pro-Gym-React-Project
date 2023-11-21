const { model, Schema } = require("mongoose");


const trainerSchema = new Schema({
    imageLocation: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const Trainer = model("Trainer", trainerSchema);


module.exports = Trainer;
