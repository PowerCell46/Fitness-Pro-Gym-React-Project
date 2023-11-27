const Highlight = require("../../schemas/highlightSchema");
const User = require("../../schemas/userSchema");
const { validateImageExtension } = require("../../utilities/validators");


async function postHighlightHandler(req, res) {
    const image = req.file;

    const validImage = validateImageExtension(image);

    if (!validImage) {
        return res.status(500).json({ error: 'Highlight Image is not of valid type!' });
    }

    const { description, ownerId } = req.body;

    try {
        const user = await User.findOne({ _id: ownerId });

        if (user === null) {
            return res.status(400).json({ error: 'No such user found!' });
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching for the user' }); // searching for the user crashed
    }

    try {
        const highlight = new Highlight({ imageLocation: image.path, description, ownerId, likes: [] });
        highlight.save();

    } catch {
        return res.status(500).json({ error: 'An error occured while the data was being written on the Database!' });
    }

    res.status(200).json({ message: 'File uploaded successfully' });
}


module.exports = { postHighlightHandler }