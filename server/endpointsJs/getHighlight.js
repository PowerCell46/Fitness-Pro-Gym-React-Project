const fs = require("fs");
const Highlight = require("../schemas/highlightSchema");


async function getHighlightHandler(req, res) {
    const highlightId = req.params.highlightId;
    
    try {
        let highlight = await Highlight.findOne({_id: highlightId}).lean();
        const imageData = await fs.promises.readFile(`${highlight.imageLocation}`, {encoding: 'base64'});

        console.log(highlight);
        highlight = {...highlight, photo: imageData}
        res.json(highlight);

    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being read from the Database!'});
    }

}


module.exports = getHighlightHandler;