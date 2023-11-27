const Highlight = require("../schemas/highlightSchema");
const User = require("../schemas/userSchema");
const fs = require("fs");


async function getUserHighlightsHandler(req, res) {
    const {userId} = req.body;
    
    try {
        var user = await User.findOne({_id: userId});

        if (user === null) {
            return res.status(400).json({ error: 'No such user found!' });    
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching for the user' }); // searching for the user crashed
    }

    try {
        var userHighlights = await Highlight.find({ownerId: userId}).sort({ uploadDate: 'desc' }).lean();
    
    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching for the Highlights' }); // searching for the user crashed
    }

    try {
            var highlightsWithImages = await Promise.all(userHighlights.map(async (highlight) => {
       
            const imageData = fs.promises.readFile(`${highlight.imageLocation}`, {encoding: 'base64'});
           
            return {...highlight, photo: await imageData};
        }));

        res.json(highlightsWithImages);

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Adding the Images to the Highlights' }); // searching for the user crashed
    }
}


module.exports = getUserHighlightsHandler;