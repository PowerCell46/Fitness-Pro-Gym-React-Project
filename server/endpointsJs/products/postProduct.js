const Product = require("../../schemas/productSchema");
const { validateImageExtension, validateProductName, validateProductType, validateProductDescription, validateProductPrice } = require("../../utilities/validators");


async function postProductHandler(req, res) {
    const image = req.file;

    const validImage = validateImageExtension(image);
    if (!validImage) {
        return res.status(400).json({ error: 'Product Image is not of valid type!' });
    }

    const { name, productType, description, price } = req.body;

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
        const product = new Product({ imageLocation: image.path, name, type: productType, description, price });
        product.save();

    } catch {
        return res.status(500).json({ error: 'An Error occured while the Product was being written on the Database!' });
    }

    res.status(200).json({ message: 'Product uploaded successfully' });
}


module.exports = postProductHandler;