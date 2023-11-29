const Highlight = require("../../schemas/highlightSchema");
const User = require("../../schemas/userSchema");

async function deleteHighlight(req, res) {
    const highlightId = req.params.highlightId;
    const {userId} = req.body;

    try {
        var user = await User.findOne({_id: userId});

        if (user === null) {
            return res.status(500).json({ error: 'No such user found!' });
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error -> (Searching for the user)' }); 
    }

    try {
        var highlight = await Highlight.findOne({_id: highlightId});
    
        if (user === null) {
            return res.status(500).json({ error: 'No such highlight found!' });
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error -> (Searching for the highlight)' }); 
    }

    if (highlight.ownerId.toString() !== userId.toString()) {
        return res.status(500).json({ error: 'You are not the creator of this Highlight!' });
    }
    
    try {
        await Highlight.findOneAndDelete({_id: highlightId});
        
    } catch {
        return res.status(500).json({ error: 'Internal Server Error -> (Deleting the Highlight)' });
    }

    return res.status(200).json({ message: 'Highlight deleted successfully!' });
}


module.exports = deleteHighlight;