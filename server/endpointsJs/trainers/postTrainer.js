const Trainer = require("../../schemas/trainerSchema");
const { validateImageExtension, validateTrainerName, validateEmail, validatePhoneNumber } = require("../../utilities/validators");
const {validateToken} = require("../../utilities/createTokenHashPassVerifyPass");
const User = require("../../schemas/userSchema");


async function postTrainerHandler(req, res) {
    const image = req.file;

    const imageValidation = validateImageExtension(image);
    if (!imageValidation) {
        return res.status(400).json({ error: 'Trainer Image is not of valid type!' });
    }

    const { name, email, phoneNumber, token } = req.body;

    const decodedToken = validateToken(token);

    if (decodedToken === null) {
        return res.status(400).json({ error: 'Invalid Authentication Token!' });
    }

    try {
        const user = await User.findOne({_id: decodedToken._id});

        if (user === null) {
            return res.status(400).json({error: "No such user found!"});
        }

        if (!user.isAdministrator) {
            return res.status(400).json({error: "You cannot create a trainer!"});
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching the User' });
    }

    const validName = validateTrainerName(name);
    if (validName !== true) {
        return res.status(400).json({ error: 'Trainer Name is not valid!' });
    }

    const validEmail = validateEmail(email);
    if (validEmail !== true) {
        return res.status(400).json({ error: 'Trainer Email is not valid!' });
    }

    const validPhoneNumber = validatePhoneNumber(phoneNumber);
    if (validPhoneNumber !== true) {
        return res.status(400).json({ error: 'Trainer Phone Number is not valid!' });
    }

    // Making the Entry with Valid Data
    try {
        const trainer = new Trainer({ imageLocation: image.path, name, email, phoneNumber })
        trainer.save();

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Creating the Trainer' });
    }

    return res.status(200).json({ message: 'File uploaded successfully!' });
}


module.exports = postTrainerHandler;