function validateImageExtension(image) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'webp'];

    const validExtension = imageExtensions.includes(image.originalname.toLowerCase().split(".")[image.originalname.split(".").length - 1]);

    const validMimeType = image.mimetype.startsWith('image/');

    return validExtension && validMimeType;
}

function validateTrainerName(name) {
    if (!name.includes(" ")) {
        return 'Full Name requiried!';
    } else if (name.length < 7) {
        return 'Full name must be at least 7 characters';
    }
    
    return true;
}

function validateEmail(email) {
    if (email.length < 5) {
        return `Email must be at least 5 characers!`;
    
    } else if (!email.includes("@")) {
        return `Email must include @ sign!`;
    
    } else if (!email.includes(".")) {
        return `Email must include . sign!`;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return `Email is not valid!`
    };

    return true;
}

function validatePhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneNumberRegex.test(phoneNumber);
}


module.exports = {validateImageExtension, validateTrainerName, validateEmail, validatePhoneNumber}