const Product = require("../schemas/productSchema");
const fs = require("fs");


async function getProductHandler(req, res) {
    const productId = req.params.productId;
    
    try {
        var product = await Product.findOne({_id: productId}).lean();
        
    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being read from the Database!'});
    }

    try {
        const imageData = await fs.promises.readFile(`${product.imageLocation}`, {encoding: 'base64'});
        product = {...product, photo: imageData}

    } catch {
        return res.status(400).json({ error: 'An error occured while the image was being read!'});
    
    } 

    res.json(product);
}


module.exports = getProductHandler;