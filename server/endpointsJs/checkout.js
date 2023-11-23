const Product = require("../schemas/productSchema");
const User = require("../schemas/userSchema");

async function checkoutHandler(req, res) {
    const {userId} = req.body;
    let finalProducts = [];

    try {
        var currentUser = await User.findOne({_id: userId});
    
    } catch {

    }
    let currentUserCart = currentUser.cart;
    try {
    for (let product of currentUserCart) {
        
        if (typeof product === 'object') {
            finalProducts.push(product);
        
        } else {
            finalProducts.push(await Product.findOne({_id: product}));
        }
    }
  
    const timestamp = Date.now();
    const currentDate = new Date(timestamp);
    const formattedDate = currentDate.toISOString();

console.log(formattedDate);

    
    console.log(formattedDate);
    } catch {

    }

} 

module.exports = checkoutHandler;