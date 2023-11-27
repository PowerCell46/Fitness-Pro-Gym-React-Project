const Product = require("../schemas/productSchema");
const User = require("../schemas/userSchema");
const fs = require("fs");
const memberships = require("../constants/memberships");
    

async function checkoutHandler(req, res) {
    const {userId} = req.body;
    let finalProducts = [];

    try {
        var currentUser = await User.findOne({_id: userId});
        
        if (currentUser === null) {
            return res.status(400).json({ error: 'No such user found!' });    
        }

    } catch {
        return res.status(500).json({ error: 'An error occured while the User was being searched in the Database!'});
    }

    let currentUserCart = currentUser.cart;

    try {
        for (let product of currentUserCart) {
            if (typeof product === 'object') {
                finalProducts.push(memberships[product.membershipType][product.membershipCategory]);
            
            } else {
                const currentProduct = await Product.findOne({_id: product});
                finalProducts.push(currentProduct);
            }
        }

    } catch {
        return res.status(500).json({ error: 'An error occured while the Products were being searched in the database!'});
    }

    try {
        const checkoutProductsWithImages = await Promise.all(finalProducts.reverse().map(async (product) => {
            const imageData = fs.promises.readFile(`${product.imageLocation}`, {encoding: 'base64'});
            return {...product, photo: await imageData};
        }));

        res.json(checkoutProductsWithImages);

    } catch(err) {
        return res.status(500).json({ error: 'An error occured while the Images were being converted!'});
    }
    
} 


module.exports = checkoutHandler;