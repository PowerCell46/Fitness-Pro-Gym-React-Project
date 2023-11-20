const Highlight = require("../schemas/highlightSchema");
const User = require("../schemas/userSchema");


async function likeHighlightHandler(req, res) {
    const highlightId = req.params.highlightId;
    const {userId} = req.body;
    
    try {
        const user = await User.findOne({_id: userId});
        if (!user) {
            return res.status(400).json({ error: 'There is no such User!' });    
        }

        const highlight = await Highlight.findOne({_id: highlightId});
        
        if (highlight.ownerId === userId) {
            return res.status(400).json({ error: 'You cannot like your own highlight!' });    
        }

        highlight.likes.push(userId);
        highlight.save();
   
    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being written on the Database!' });
    }

    res.json("Successful operation");
} 

module.exports = likeHighlightHandler;