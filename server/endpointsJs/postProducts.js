const Product = require("../schemas/productSchema");


async function postProductHandler(req, res) {
    const image = req.file;
    
    const validImage = validateImageExtension(image);
    if (!validImage) {
        return res.status(400).json({ error: 'Product Image is not of valid type!' });
    }

    const {name, productType, description, price} = req.body;
    const validName = validateProductName(name);
    if (!validName) {
        return res.status(400).json({ error: 'Product Name is not valid!' });
    } 

    const validProductType = validateProductType(productType);
    if (!validProductType) {
        return res.status(400).json({ error: 'Product Type is not valid!' });
    }

    const validDescription = validateProductDescription(description);
    if (!validDescription) {
        return res.status(400).json({ error: 'Product Description is not valid!' });
    }

    const validPrice = validateProductPrice(price);
    if (!validPrice) {
        return res.status(400).json({ error: 'Product Price is not valid!' });
    }
    
    try {
        const product = new Product({imageLocation: image.path, name, type: productType, description, price});
        product.save();
    
    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being written on the Database!' });   
    }

    res.status(200).json({ message: 'Product uploaded successfully' });
}


function validateImageExtension(image) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp'];

    const validExtension = imageExtensions.includes(image.originalname.toLowerCase().split(".")[image.originalname.split(".").length - 1]);

    const validMimeType = image.mimetype.startsWith('image/');

    return validExtension && validMimeType;
}


function validateProductName(name) {
    if (name.length < 5 || name.length > 25) {
        return false;
    }
    return true;
}


function validateProductType(productType) {
    return ["foodSupplement", "fitnessMachine", "merchandise"].includes(productType);
}


function validateProductDescription(description) {
    if (description.length < 10 || description.length > 50) {
        return false;
    }
    return true;
}


function validateProductPrice(price) {
    if (price <= 0 || price > 100000) {
        return false;
    } 
    return true;
}


module.exports = postProductHandler;