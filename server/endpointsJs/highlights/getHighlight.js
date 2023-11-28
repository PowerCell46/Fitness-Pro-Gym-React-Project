const fs = require("fs");
const Highlight = require("../../schemas/highlightSchema");


async function getHighlightHandler(req, res) {
    const highlightId = req.params.highlightId;

    try {
        let highlight = await Highlight.findOne({ _id: highlightId }).lean();

        try {
            var imageData = await fs.promises.readFile(`${highlight.imageLocation}`, { encoding: 'base64' });

        } catch {
            return res.status(500).json({ error: 'An error occured while the Image was being converted!' });
        }

        highlight = { ...highlight, photo: imageData }

        return res.json(highlight);

    } catch {
        return res.status(500).json({ error: 'An error occured while the data was being read from the Database!' });
    }
}


module.exports = getHighlightHandler;