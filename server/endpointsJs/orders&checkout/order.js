const fs = require("fs");
const User = require("../../schemas/userSchema");
const Product = require("../../schemas/productSchema");
const memberships = require("../../constants/memberships");

async function getOrderHandler(req, res) {
    const orderId = req.params.orderId;
    const {userId} = req.body;

    try {
        var user = await User.findOne({_id: userId}).lean();

        if (user === null) {
            return res.status(400).json({ error: 'No such user found!' });
        }

        const order = user.orders.filter(x => x.orderDetails.orderId === Number(orderId));
        
        if (order.length === 0) {
            return res.status(400).json({ error: 'No such order found!' });
        
        } else {
            const data = order[0];

            try {
                const productsWithImages = await Promise.all(data.orderDetails.products.reverse().map(async (product) => {
                    let imageLocation = '';
                    let price = 0;
                    
                    if (typeof product.productId === 'string') {
                        const imageData = await Product.findOne({_id: product.productId});
                        imageLocation = imageData.imageLocation;
                        price = imageData.price;
    
                    } else {
                        imageLocation = 'images/dumbbells-cartoon-icon-isolated-vector-32127279.jpg';
                        price = memberships[product.productId.membershipType][product.productId.membershipCategory].price;
                    }
    
                    const imageData = fs.promises.readFile(imageLocation, {encoding: 'base64'});
                    return {...product, photo: await imageData, price};
                }));

                data.orderDetails.products = productsWithImages;

            } catch {
                return res.status(500).json({ error: 'Error - Converting the Images' });
            }

            return res.send({data});
        }

    } catch {
        return res.status(500).json({ error: 'Error - Searching for the User' });
    }
}


module.exports = getOrderHandler;