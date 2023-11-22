const Product = require("../schemas/productSchema");


async function postProductHandler(req, res) {
    const image = req.file;
    
    const validImage = validateImageExtension(image);
    if (!validImage) {
        return res.status(400).json({ error: 'Product Image is not of valid type!' });
    }

    const {name, productType, description, price} = req.body;
   
    const validName = validateProductName(name);
    if (validName !== true) {
        return res.status(400).json({ error: 'Product Name is not valid!' });
    } 

    const validProductType = validateProductType(productType);
    if (validProductType !== true) {
        return res.status(400).json({ error: 'Product Type is not valid!' });
    }

    const validDescription = validateProductDescription(description);
    if (validDescription !== true) {
        return res.status(400).json({ error: 'Product Description is not valid!' });
    }

    const validPrice = validateProductPrice(price);
    if (validPrice !== true) {
        return res.status(400).json({ error: 'Product Price is not valid!' });
    }
    
    // Making the request with valid data
    try {
        const product = new Product({imageLocation: image.path, name, type: productType, description, price});
        product.save();
    
    } catch {
        return res.status(500).json({ error: 'An Error occured while the Product was being written on the Database!' });   
    }

    res.status(200).json({ message: 'Product uploaded successfully' });
}


function validateImageExtension(image) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'webp'];

    const validExtension = imageExtensions.includes(image.originalname.toLowerCase().split(".")[image.originalname.toLowerCase().split(".").length - 1]);

    const validMimeType = image.mimetype.startsWith('image/');

    return validExtension && validMimeType;
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


module.exports = postProductHandler;