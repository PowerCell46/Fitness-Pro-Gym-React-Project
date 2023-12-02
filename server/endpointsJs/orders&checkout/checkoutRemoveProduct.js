const User = require("../../schemas/userSchema");


async function checkoutRemoveProductHandler(req, res) {
    const {userId, removedProductId} = req.body;

    try {
        var currentUser = await User.findOne({_id: userId});
        
        if (currentUser === null) {
            return res.status(400).json({ error: 'No such user found!' });    
        }

    } catch {
        return res.status(500).json({ error: 'An error occured while the User was being searched in the Database!'});
    }
    console.log(currentUser);
    
    try {
        if (typeof removedProductId === "object")  {
            currentUser.cart = currentUser.cart.filter((element) => !(element.membershipType === removedProductId.membershipType && element.membershipCategory === removedProductId.membershipCategory));
      
        } else {
            currentUser.cart = currentUser.cart.filter((element) => element !== removedProductId);
        }
        
        await User.updateOne({ _id: userId }, { cart: currentUser.cart }); 
        
        res.json("Successful Operation!");
  
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while the Product was being removed from the User cart!' });
    }
}


module.exports = checkoutRemoveProductHandler;