const {model, Schema} = require("mongoose");


const highlightSchema = new Schema({
    imageLocation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    uploadDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const Highlight = model("Highlight", highlightSchema);


module.exports = Highlight;