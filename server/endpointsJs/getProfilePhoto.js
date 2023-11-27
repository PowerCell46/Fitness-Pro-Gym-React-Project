const User = require("../schemas/userSchema");
const fs = require("fs");

async function getProfilePhoto(req, res ){
    const {userId} = req.body;

    try {
        var user = await User.findOne({_id: userId});

        if (user === null) {
            return res.status(400).json({ error: 'No such user found!' });    
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching for the user' }); // searching for the user crashed
    }

    const imageData = await fs.promises.readFile(`${user.imageLocation}`, {encoding: "base64"});
    res.json(imageData);
}


module.exports = getProfilePhoto;