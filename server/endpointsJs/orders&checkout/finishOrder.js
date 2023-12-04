const nodemailer = require('nodemailer');

const User = require("../../schemas/userSchema");
const { formatOrderedProducts } = require('../../utilities/formatOrderedProducts');

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
        const mailOptions = {
            from: 'PowerCell4664@gmail.com',
            to: 'radovr4@gmail.com',
            subject: `New Successful Order from ${user.username}!`,
            text: '',
            html: `
              <html>
                <body>
                  <h2>New Order:</h2>
                  <h3>User Details:</h3>
                  <p><strong>User:</strong> ${user.username}</p>
                  <p><strong>Email:</strong> ${user.email}</p>
          
                  <h3>Ordered Products:</h3>
                  <ul>
                    ${formatOrderedProducts(orderDetails)}
                  </ul>
          
                  <h3>Shipping Details:</h3>
                  <p>
                    <strong>Country:</strong> ${shippingDetails.country}<br>
                    <strong>City:</strong> ${shippingDetails.city}<br>
                    <strong>Neighbourhood:</strong> ${shippingDetails.neighbourhood}<br>
                    <strong>Street:</strong> ${shippingDetails.street}<br>
                    <strong>Number:</strong> ${shippingDetails.number}<br>
                    <strong>Apartment:</strong> ${shippingDetails.apartment}
                  </p>
                </body>
              </html>
            `,
          };
          
        await transporter.sendMail(mailOptions);

    } catch (err){
        return res.status(500).json({ error: 'An error occurred while the Email was being send!' });
    }
    
    res.json("Successful Operation!");
}


module.exports = finishOrderHandler;