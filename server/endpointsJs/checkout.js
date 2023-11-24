const Product = require("../schemas/productSchema");
const User = require("../schemas/userSchema");
const fs = require("fs");

const memberships = {
    "Single Workout": {
        "under18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Single Workout Under18",
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
        "under18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Weekly Membership Under18",
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
        "under18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Monthly Memberhip Under18",
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
        "under18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Three Months Membership Under18",
            type: "Fitness Membership",
            price: 85
        },
        "men": {
                imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
                name: "Three Months Membership Men",
                type: "Fitness Membership",
                price: 105
        },
        "women": {
                imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
                name: "Three Months Membership Women",
                type: "Fitness Membership",
                price: 95
        }
    },
    "Six Months Membership": {
        "under18": {
                imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
                name: "Six Months Membership Under18",
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
        "under18": {
            imageLocation: "images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg",
            name: "Year Membership Under18",
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