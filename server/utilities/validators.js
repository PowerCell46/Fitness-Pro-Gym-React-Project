function validateImageExtension(image) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'webp'];

    const validExtension = imageExtensions.includes(image.originalname.toLowerCase().split(".")[image.originalname.split(".").length - 1]);

    const validMimeType = image.mimetype.startsWith('image/');

    return validExtension && validMimeType;
}


module.exports = {validateImageExtension}