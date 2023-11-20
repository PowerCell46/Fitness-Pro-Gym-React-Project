const fs = require("fs");
const Highlight = require("../schemas/highlightSchema");


async function getHighlightsHandler(req, res) {
    try {
        var data = await Highlight.find().lean();
        
    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being read from the Database!'});
    }
    
    const highlightsWithImages = await Promise.all(data.map(async (highlight) => {
        const imageData = fs.promises.readFile(`${highlight.imageLocation}`, {encoding: 'base64'});
        return {...highlight, photo: await imageData};
    }));
    
    res.json(highlightsWithImages);


} 


module.exports = getHighlightsHandler;