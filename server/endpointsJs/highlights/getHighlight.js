const fs = require("fs");
const Highlight = require("../../schemas/highlightSchema");


async function getHighlightHandler(req, res) {
    const highlightId = req.params.highlightId;

    try {
        let highlight = await Highlight.findOne({ _id: highlightId }).lean();

        // Изнеси в отделен файл
        const imageData = await fs.promises.readFile(`${highlight.imageLocation}`, { encoding: 'base64' });

        highlight = { ...highlight, photo: imageData }

        res.json(highlight);

    } catch {
        return res.status(500).json({ error: 'An error occured while the data was being read from the Database!' });
    }

}


module.exports = getHighlightHandler;