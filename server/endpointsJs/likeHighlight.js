const Highlight = require("../schemas/highlightSchema");


async function likeHighlightHandler(req, res) {
    const highlightId = req.params.highlightId;
    const {userId} = req.body;
    try {
        const highlight = await Highlight.findOne({_id: highlightId});
        highlight.likes.push(userId);
        highlight.save();
   
    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being written on the Database!' });
    }

    res.json("Successful operation");
} 

module.exports = likeHighlightHandler;