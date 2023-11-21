const Highlight = require("../schemas/highlightSchema");



function postHighlightHandler(req, res) {
    const image = req.file;
    
    const validImage = validateImageExtension(image);

    if (!validImage) {
        return res.status(400).json({ error: 'Highlight Image is not of valid type!' });
    }

    const {description, ownerId} = req.body;

    try {
        const highlight = new Highlight({imageLocation: image.path, description, ownerId, likes: []});
        highlight.save();
    
    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being written on the Database!' });   
    }

    res.status(200).json({ message: 'File uploaded successfully' });
}


function validateImageExtension(image) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp'];

    const validExtension = imageExtensions.includes(image.originalname.toLowerCase().split(".")[image.originalname.split(".").length - 1]);

    const validMimeType = image.mimetype.startsWith('image/');

    return validExtension && validMimeType;
}


module.exports = {postHighlightHandler}