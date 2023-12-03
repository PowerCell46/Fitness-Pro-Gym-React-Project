const Highlight = require("../../schemas/highlightSchema");
const User = require("../../schemas/userSchema");


async function likeHighlightHandler(req, res) {
    const highlightId = req.params.highlightId;
    const { userId } = req.body;

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(500).json({ error: 'User not found!' });
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error -> (User not found)' });
    }

    try {
        var highlight = await Highlight.findOne({ _id: highlightId });

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Highlight not found!' });
    }

    if (highlight.ownerId === userId) {
        return res.status(400).json({ error: 'You cannot like your own highlight!' });

    } else if (highlight.likes.includes(userId)) {
        return res.status(400).json({ error: 'You\'ve already liked this Highlight!' });
    }

    highlight.likes.push(userId);
    highlight.save();


    return res.json("Successful operation");
}


module.exports = likeHighlightHandler;