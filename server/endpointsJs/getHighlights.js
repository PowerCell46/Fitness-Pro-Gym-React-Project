const fs = require("fs");
const Highlight = require("../schemas/highlightSchema");


async function getHighlightsHandler(req, res) {
    try {
        var data = await Highlight.find().sort({ uploadDate: 'desc' }).lean();
        
    } catch {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
    
    // TRY CATCH
    // can be moved to another file...!
    const highlightsWithImages = await Promise.all(data.map(async (highlight) => {
       
        const imageData = fs.promises.readFile(`${highlight.imageLocation}`, {encoding: 'base64'});
       
        return {...highlight, photo: await imageData};
    }));
    
    res.json(highlightsWithImages);
} 


module.exports = getHighlightsHandler;