const User = require("../schemas/userSchema");


async function checkoutRemoveProductHandler(req, res) {
    const {userId, removedProductId} = req.body;
    
    try {
        var currentUser = await User.findOne({_id: userId});
    
    } catch {
        return res.status(500).json({ error: 'An error occured while the User was being searched in the Database!'});
    }

    
    try {
        currentUser.cart = currentUser.cart.filter((element) => typeof(element) === "object" ? element._id !== removedProductId : element !== removedProductId);
        
        await User.updateOne({ _id: userId }, { cart: currentUser.cart }); 
        
        res.json("Successful Operation!");
  
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while the Product was being removed from the User cart!' });
    }
}

module.exports = checkoutRemoveProductHandler;