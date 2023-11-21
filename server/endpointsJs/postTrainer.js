const Trainer = require("../schemas/trainerSchema");


async function postTrainerHandler(req, res) {
    const image = req.file;

    const imageValidation = validateImageExtension(image);
    if (!imageValidation) {
        return res.status(400).json({ error: 'Trainer Image is not of valid type!' });
    }

    const {name, email, phoneNumber} = req.body;

    const validName = validateName(name);
    if (!validName) {
        return res.status(400).json({ error: 'Trainer Name is not valid!' });
    
    }

    const validEmail = validateEmail(email);
    if (!validEmail) {
        return res.status(400).json({ error: 'Trainer Email is not valid!' });

    } 

    const validPhoneNumber = validatePhoneNumber(phoneNumber);
    if (!validPhoneNumber) {
        return res.status(400).json({ error: 'Trainer Phone Number is not valid!' });  
    }
    
    
    try {
        const trainer = new Trainer({imageLocation: image.path, name, email, phoneNumber})
        trainer.save();

    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being written on the Database!' });   
    }

    res.status(200).json({ message: 'File uploaded successfully' });

} 


function validateImageExtension(image) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp'];

    const validExtension = imageExtensions.includes(image.originalname.toLowerCase().split(".")[image.originalname.split(".").length - 1]);

    const validMimeType = image.mimetype.startsWith('image/');

    return validExtension && validMimeType;
}


function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


function validateName(name) {
    if (!name.includes(" ") || name.length < 7) {
        return false;
    }
    return true;
}


function validatePhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneNumberRegex.test(phoneNumber);
}


module.exports = postTrainerHandler;