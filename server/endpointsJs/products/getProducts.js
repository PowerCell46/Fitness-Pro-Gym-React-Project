const fs = require("fs");
const Product = require("../../schemas/productSchema");


async function getProductsHandler(req, res) {
    try {
        var data = await Product.find().sort({ uploadDate: 'asc' }).lean();

    } catch {
        return res.status(500).json({ error: 'An Error occured while the Products were being written searched on the Database!' });
    }
    
    try {
        var productsWithImages = await Promise.all(data.map(async (product) => {
            const imageData = fs.promises.readFile(`${product.imageLocation}`, { encoding: 'base64' });
            return { ...product, photo: await imageData };
        }));

    } catch {
        return res.status(500).json({ error: 'An Error occured while the Images were being converted!' });
    }

    res.json(productsWithImages);
}


module.exports = getProductsHandler;