const fs = require("fs");
const Highlight = require("../../schemas/highlightSchema");


async function getHighlightsHandler(req, res) {
    try {
        var data = await Highlight.find().sort({ uploadDate: 'desc' }).lean();

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching for the Highlights' });
    }

    try {
        var highlightsWithImages = await Promise.all(data.map(async (highlight) => {
    
        const imageData = fs.promises.readFile(`${highlight.imageLocation}`, { encoding: 'base64' });
    
        return { ...highlight, photo: await imageData };
        }));

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Converting the Images' });
    }

    return res.json(highlightsWithImages);
}


module.exports = getHighlightsHandler;