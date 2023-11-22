export function validatePassword(password) {
    password = password.split("");
    const uppercaseChars = password.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
    const digits = password.filter(char =>char.charCodeAt() >= 48 && char.charCodeAt() <= 57);
    if (uppercaseChars.length === 0) {
        return `Password must have at least one Uppercase!`;
    
    } else if (digits.length === 0) {
        return `Password must have at least one Number!`;
    
    } else if (password.length < 6) {
        return `Password must be at least 6 characters!`;
    }

    return true;
}


export function validateUsername(username) {
    username = username.split("");
    const uppercaseChars = username.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
    if (username.length < 4) {
        return 'Username must be at least 4 characters!';
    } else if (uppercaseChars.length === 0) {
        return `Username must have at leat one Uppercase!`;
    } 
     
    return true;
}


export function validateImageExtension(image) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'webp'];

    const validExtension = imageExtensions.includes(image.name.toLowerCase().split(".")[image.name.toLowerCase().split(".").length - 1]);

    const validMimeType = image.type.startsWith('image/');

    return validExtension && validMimeType;
}


export function validateTrainerName(name) {
    if (!name.includes(" ") || name.length < 7) {
        return false;
    }
    return true;
}


export function validatePhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneNumberRegex.test(phoneNumber);
}


export function validateEmail(email) {
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


export function validateProductName(name) {
    if (name.length < 5) {
        return `Name must be at least 5 characters!`;
   
    } else if (name.length > 25) {
        return `Name must be less than 25 characters!`;
    }

    return true;
}


export function validateProductDescription(description) {
    if (description.length < 5) {
        return `Description must be at least 5 characters!`;
    
    } else if (description.length > 1500) {
        return `Description must be less than 1500 characters!`;
    }
    
    return true;
}


export function validateProductPrice(price) {
    if (price <= 0) {
        return `Price must be > 0!`
    } else if (price >100000){
        return `Price must be < 100 000!`;
    }
    
    return true;
}