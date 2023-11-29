const User = require("../../schemas/userSchema");
const memberships = require("../../constants/memberships");


async function membershipsHandler(req, res) {
    const membershipType = req.params.type;
    const membershipCategory = req.params.category;
    const { userId } = req.body;

    if (!Object.keys(memberships).includes(membershipType)) {
        return res.status(400).json({error: "Invalid Membership Type!"});
    }

    if (!Object.keys(memberships['Single Workout']).includes(membershipCategory)) {
        return res.status(400).json({error: "Invalid Membership Category!"});
    }

    let currentMembershipData = {membershipType, membershipCategory};

    try {
        var currentUser = await User.findOne({ _id: userId }).lean();
   
        if (currentUser === null) {
            return res.status(400).json({error: "User not found!"});
        }

    } catch {
        return res.status(500).json({ error: 'An error occurred while the user was being searched in the database!' });
    }

    try {
        const membershipExists = currentUser.cart.some(item => {
            return (
              item.membershipType === currentMembershipData.membershipType &&
              item.membershipCategory === currentMembershipData.membershipCategory
            );
          });

        if (!membershipExists) {
            currentUser.cart.push(currentMembershipData);
            
        } else {
            return res.json("Membership already in Cart!");    
        }

        await User.updateOne({ _id: userId }, { cart: currentUser.cart }); 
        
        res.json("Successful Operation!");
  
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while the membership was being added to the user!' });
    }
}


module.exports = membershipsHandler;