const Trainer = require("../../schemas/trainerSchema");
const { validateImageExtension, validateTrainerName, validateEmail, validatePhoneNumber } = require("../../utilities/validators");


async function postTrainerHandler(req, res) {
    const image = req.file;

    const imageValidation = validateImageExtension(image);
    if (!imageValidation) {
        return res.status(400).json({ error: 'Trainer Image is not of valid type!' });
    }

    const { name, email, phoneNumber } = req.body;

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

    try {
        const trainer = new Trainer({ imageLocation: image.path, name, email, phoneNumber })
        trainer.save();

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Creating the Trainer' });
    }

    res.status(200).json({ message: 'File uploaded successfully' });
}



module.exports = postTrainerHandler;