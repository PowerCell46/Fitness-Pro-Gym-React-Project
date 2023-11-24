const User = require("../schemas/userSchema");

const memberships = {
    "Single Workout": {
        "under 18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Single Workout Under 18",
            type: "Fitness Membership",
            price: 2
        },
        "men": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Single Workout Men",
            type: "Fitness Membership",
            price: 4
        },
        "women": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Single Workout Women",
            type: "Fitness Membership",
            price: 3
        }
    },
    "Weekly Membership": {
        "under 18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Weekly Membership Under 18",
            type: "Fitness Membership",
            price: 8
        },
        "men": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Weekly Membership Men",
            type: "Fitness Membership",
            price: 12
        },
        "women": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Weekly Membership Women",
            type: "Fitness Membership",
            price: 10
        }
    },
    "Monthly Membership": {
        "under 18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Monthly Memberhip Under 18",
            type: "Fitness Membership",
            price: 30
        },
        "men": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Monthly Membership Men",
            type: "Fitness Membership",
            price: 38
        },
        "women": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Monthly Membership Women",
            type: "Fitness Membership",
            price: 32
        }
    },
    "Three Months Membership": {
        "under 18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Three Months Membership Under 18",
            type: "Fitness Membership",
            price: 85
        },
        "men": {
            "under 18": {
                imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
                name: "Three Months Membership Men",
                type: "Fitness Membership",
                price: 105
            },
        },
        "women": {
            "under 18": {
                imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
                name: "Three Months Membership Women",
                type: "Fitness Membership",
                price: 95
            },
        }
    },
    "Six Months Membership": {
        "under 18": {
                imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
                name: "Six Months Membership Under 18",
                type: "Fitness Membership",
                price: 150
        },
        "men": {
                imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
                name: "Six Months Membership Men",
                type: "Fitness Membership",
                price: 190
        },
        "women": {
                imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
                name: "Six Months Membership Women",
                type: "Fitness Membership",
                price: 180
        }
    },
    "Year Membership": {
        "under 18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Year Membership Under 18",
            type: "Fitness Membership",
            price: 200
        },
        "men": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Year Membership Men",
            type: "Fitness Membership",
            price: 250
        },
        "women": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
                name: "Year Membership Women",
                type: "Fitness Membership",
                price: 220
        }
    }
}

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

    // currentMembershipData._id = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    
    try {
        var currentUser = await User.findOne({ _id: userId }).lean();
   
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while the user was being searched in the database!' });
    }

    try {

        if (!currentUser.cart.includes(currentMembershipData)) {
            currentUser.cart.push(currentMembershipData);
            
        } else {
            // You can show the user that he already has this membership in the cart
        }

        await User.updateOne({ _id: userId }, { cart: currentUser.cart }); 
        
        res.json("Successful Operation!");
  
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while the membership was being added to the user!' });
    }
}



module.exports = membershipsHandler;