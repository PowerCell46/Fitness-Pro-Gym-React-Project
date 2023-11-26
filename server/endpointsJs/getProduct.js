const Product = require("../schemas/productSchema");
const fs = require("fs");


async function getProductHandler(req, res) {
    const productId = req.params.productId;
    
    try {
        var product = await Product.findOne({_id: productId}).lean();
        
        if (product === null) {
            return res.status(400).json({ error: 'Product not found!'});    
        }
        
    } catch {
        return res.status(500).json({ error: 'An error occured while the data was being read from the Database!'});
    }

    try {
        const imageData = await fs.promises.readFile(`${product.imageLocation}`, {encoding: 'base64'});
        product = {...product, photo: imageData}

    } catch {
        return res.status(500).json({ error: 'An Error occured while the Image was being converted!'});
    } 

    res.json(product);
}


module.exports = getProductHandler;