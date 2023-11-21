export function validatePassword(password) {
    password = password.split("");
    const uppercaseChars = password.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
    const digits = password.filter(char =>char.charCodeAt() >= 48 && char.charCodeAt() <= 57);
    if (password.length < 6 || !uppercaseChars || !digits) {
        return false;
    }
    return true;
}


export function validateUsername(username) {
    username = username.split("");
    const uppercaseChars = username.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
    if (username.length < 4 || !uppercaseChars) {
        return false;
    }
    return true;
}


export function validateImageExtension(image) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp'];

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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


export function validateProductName(name) {
    if (name.length < 5 || name.length > 25) {
        return false;
    }
    return true;
}


export function validateProductDescription(description) {
    if (description.length < 10 || description.length > 500) {
        return false;
    }
    return true;
}


export function validateProductPrice(price) {
    if (price <= 0 || price > 100000) {
        return false;
    } 
    return true;
}