const { model, Schema } = require("mongoose");


const instructorSchema = new Schema({
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
    }
});


const Instructor = model("Instructor", instructorSchema);


module.exports = Instructor;
