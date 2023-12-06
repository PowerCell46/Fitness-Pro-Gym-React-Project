const fs = require("fs");
const User = require("../../schemas/userSchema");
const nodemailer = require('nodemailer');
const mainContentHandler = require("../../utilities/formatOrderedProducts");
const Product = require("../../schemas/productSchema");
const memberships = require("../../constants/memberships");


async function finishOrderHandler(req, res) {
    const {userId, orderDetails, shippingDetails} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'PowerCell4664@gmail.com',
          pass: 'hxfb vrxt wvle rlex'
        }
      });

    try {
        var user = await User.findOne({_id: userId});
        
        if (!user) {
            return res.status(500).json({ error: 'An error occured while the User was being searched in the Database!'});
        } 
        
    } catch {
        return res.status(500).json({ error: 'An error occured while the User was being searched in the Database!'});
    }

    user.orders.push({orderDetails, shippingDetails});
    
    try {
        await User.updateOne({ _id: userId }, { orders: user.orders }); 

        await User.updateOne({_id: userId}, {cart: []});
    
    } catch {
        return res.status(500).json({ error: 'An error occurred while the Order was being finished!' });
    }


    try {
        try {
            const productsWithImages = await Promise.all(orderDetails.products.reverse().map(async (product) => {
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

                const imageData = fs.promises.readFile(imageLocation);
                return {...product, photo: await imageData, price};
            }));

            orderDetails.products = productsWithImages;

      } catch {
          return res.status(500).json({ error: 'Error - Converting the Images' });
      }

        const mailContent = mainContentHandler(orderDetails, shippingDetails);

        const mailOptions = {
            from: 'PowerCell4664@gmail.com',
            to: 'radovr4@gmail.com',
            subject: `New Successful Order from ${user.username}!`,
            text: '',
            html: mailContent
            // html: `
            //   <html>
            //     <body>
            //       <h2>New Order #${orderDetails.orderId}:</h2>
            //       <h3>User Details:</h3>
            //       <p><strong>User:</strong> ${user.username}</p>
            //       <p><strong>Email:</strong> ${user.email}</p>
          
            //       <h3>Ordered Products:</h3>
            //       <ul>
            //         ${formatOrderedProducts(orderDetails)}
            //       </ul>
            //       <h4>Total Price: ${orderDetails.totalPrice} BGN.</h4>
          
            //       <h3>Shipping Details:</h3>
            //       <p>
            //         <strong>Country:</strong> ${shippingDetails.country}<br>
            //         <strong>City:</strong> ${shippingDetails.city}<br>
            //         <strong>Neighbourhood:</strong> ${shippingDetails.neighbourhood}<br>
            //         <strong>Street:</strong> ${shippingDetails.street}<br>
            //         <strong>Number:</strong> ${shippingDetails.number}<br>
            //         <strong>Apartment:</strong> ${shippingDetails.apartment}
            //       </p>
            //     </body>
            //   </html>
            // `,
          };
          
        await transporter.sendMail(mailOptions);

    } catch (err){
        return res.status(500).json({ error: 'An error occurred while the Email was being send!' });
    }
    
    res.json("Successful Operation!");
}


module.exports = finishOrderHandler;