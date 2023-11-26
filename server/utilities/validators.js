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


function validateProductName(name) {
    if (name.length < 5) {
        return `Name must be at least 5 characters!`;
   
    } else if (name.length > 25) {
        return `Name must be less than 25 characters!`;
    }

    return true;
}


function validateProductType(productType) {
    return ["foodSupplement", "fitnessMachine", "merchandise"].includes(productType);
}


function validateProductDescription(description) {
    if (description.length < 5) {
        return `Description must be at least 5 characters!`;
    
    } else if (description.length > 1500) {
        return `Description must be less than 1500 characters!`;
    }
    
    return true;
}


function validateProductPrice(price) {
    if (price <= 0) {
        return `Price must be > 0!`
    } else if (price >100000){
        return `Price must be < 100 000!`;
    }
    
    return true;
}


module.exports = {
    validateImageExtension, validateTrainerName, 
    validateEmail, validatePhoneNumber, validateProductName,
    validateProductType, validateProductDescription, validateProductPrice}