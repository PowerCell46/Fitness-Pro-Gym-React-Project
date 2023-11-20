const Highlight = require("../schemas/highlightSchema");



function postHighlightHandler(req, res) {
    const image = req.file;
    // Valdidate image
    const {description, ownerId} = req.body;

    const highlight = new Highlight({imageLocation: image.path, description, ownerId, likes: []});
    highlight.save();
    // try catch

    res.status(200).json({ message: 'File uploaded successfully' });
}


module.exports = {postHighlightHandler}