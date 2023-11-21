const fs = require("fs");
const Product = require("../schemas/productSchema");


async function getProductsMerchandiseHandler(req, res) {
    try {
        var data = await Product.find({type: "merchandise"}).sort({ uploadDate: 'desc' }).lean();
        
    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being read from the Database!'});
    }

    const productsWithImages = await Promise.all(data.map(async (product) => {
        const imageData = fs.promises.readFile(`${product.imageLocation}`, {encoding: 'base64'});
        return {...product, photo: await imageData};
    }));

    res.json(productsWithImages);
}


module.exports = getProductsMerchandiseHandler;