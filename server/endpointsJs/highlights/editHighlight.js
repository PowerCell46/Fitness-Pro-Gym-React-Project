const Highlight = require("../../schemas/highlightSchema");
const User = require("../../schemas/userSchema");
const {validateImageExtension} = require("../../utilities/validators");


async function editHighlight(req, res) {
    const image = req.file;
    const { description, userId } = req.body;
    const highlightId = req.params.highlightId;

    try {
        var user = await User.findOne({_id: userId});

        if (user === null) {
            return res.status(500).json({ error: 'No such user found!' });
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching for the user' }); 
    }


    try {
        const highlight = await Highlight.findOne({_id: highlightId});

        if (highlight === null) {
            return res.status(500).json({ error: 'No such highlight found!' });
        }

        if (!(highlight.ownerId === userId || user.isAdministrator)) {
            return res.status(400).json({error: "You cannot edit this Highlight!"});
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching the highlight' }); 
    }


    if (image === undefined) { // only the description was changed
        
       try {
            await Highlight.findOneAndUpdate(
                { _id: highlightId },
                {description: description },
                { new: true }
            );

       } catch {
            return res.status(500).json({ error: 'Internal Server Error - Updating the user' }); 
       }

    } else { // Image was being changed
        const image = req.file;
        
        const validImage = validateImageExtension(image);

        if (!validImage) {
            return res.status(400).json({ error: 'Highlight Image is not of valid type!' });
        }

        try {
            await Highlight.findOneAndUpdate(
                { _id: highlightId },
                { imageLocation: image.path, description: description },
                { new: true }
            );
            
        } catch {
            return res.status(500).json({ error: 'Internal Server Error - Updating the user' }); 
        }
    }

    res.status(200).json({ message: 'File updated successfully!' });
}


module.exports = editHighlight;