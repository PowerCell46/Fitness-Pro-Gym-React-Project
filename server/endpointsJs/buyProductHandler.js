const User = require("../schemas/userSchema");


async function buyProductHandler(req, res) {
    const productId = req.params.productId;
    const {userId} = req.body;

    try {
        var currentUser = await User.findOne({_id: userId});
        
    } catch {
        return res.status(500).json({ error: 'An error occurred while the user was being searched in the database!' });
    }
    
    try {

        currentUser.cart.push(productId);

        await User.updateOne({ _id: userId }, { cart: currentUser.cart }); 
        
        res.json("Successful Operation!");
  
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while the membership was being added to the user!' });
    }
}

module.exports = buyProductHandler;