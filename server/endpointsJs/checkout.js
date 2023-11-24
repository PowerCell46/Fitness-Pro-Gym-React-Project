const Product = require("../schemas/productSchema");
const User = require("../schemas/userSchema");
const fs = require("fs");


async function checkoutHandler(req, res) {
    const {userId} = req.body;
    let finalProducts = [];

    try {
        var currentUser = await User.findOne({_id: userId});
    
    } catch {
        return res.status(500).json({ error: 'An error occured while the User was being searched in the Database!'});
    }

    let currentUserCart = currentUser.cart;

    try {

        for (let product of currentUserCart) {
            if (typeof product === 'object') {
                finalProducts.push(product);
            
            } else {
                const currentProduct = await Product.findOne({_id: product});
                finalProducts.push(currentProduct);
            }
        }

    } catch {
        return res.status(500).json({ error: 'An error occured while the Products were being searched in the database!'});
    }

    try {
        finalProducts.sort((a, b) => { // Sorting the Products by upload date in Desc Order
            const dateA = new Date(a.uploadDate);
            const dateB = new Date(b.uploadDate);
        
            return dateB - dateA;
        });

        const checkoutProductsWithImages = await Promise.all(finalProducts.map(async (product) => {
            const imageData = fs.promises.readFile(`${product.imageLocation}`, {encoding: 'base64'});
            return {...product, photo: await imageData};
        }));

        res.json(checkoutProductsWithImages);

    } catch(err) {
        return res.status(500).json({ error: 'An error occured while the Images were being converted!'});
    }
    
} 


module.exports = checkoutHandler;