const User = require("../schemas/userSchema");


async function buyProductHandler(req, res) {
    const productId = req.params.productId;
    const {userId} = req.body;

    try {
        var currentUser = await User.findOne({_id: userId});

        if (currentUser === null) {
            return res.status(400).json({ error: 'No such user found!' });    
        }
        
    } catch {
        return res.status(500).json({ error: 'An error occurred while the user was being searched in the database!' });
    }
    
    try {

        if (!currentUser.cart.includes(productId)) {
            currentUser.cart.push(productId);

            await User.updateOne({ _id: userId }, { cart: currentUser.cart }); 
        
        } else {
            return res.status(400).json({ error: 'Product already in cart!'}); // Instead of showing the 404 page, show a message to the User    
        }

        res.json("Successful Operation!");
  
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while the membership was being added to the user!' });
    }
}


module.exports = buyProductHandler;