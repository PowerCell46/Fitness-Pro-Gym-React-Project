const User = require("../schemas/userSchema");
const { validateImageExtension } = require("../utilities/validators");


async function postProfilePhotoHandler(req, res) {
    const image = req.file;

    const validImage = validateImageExtension(image);
   
    if (!validImage) {
        return res.status(500).json({ error: 'Profile Photo is not of valid type!' });
    }

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
        await User.updateOne({ _id: userId }, { imageLocation: image.path}); 
    
        res.json("Successful Operation!");

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Changing the ImageLocation' }); // searching for the user crashed
    }
}


module.exports = postProfilePhotoHandler;