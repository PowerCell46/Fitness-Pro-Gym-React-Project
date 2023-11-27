// const nodemailer = require('nodemailer');

const User = require("../schemas/userSchema");

async function finishOrderHandler(req, res) {
    const {userId, orderDetails, shippingDetails} = req.body;

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'PowerCell4664@gmail.com',
    //       pass: 'MordorForuSaLl'
    //     }
    //   });

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


    // try {
    //     const emailContent = `New Order: ${JSON.stringify(user.orders)}`;

    //     const mailOptions = {
    //         from: 'PowerCell4664@gmail.com',
    //         to: 'radovr4@gmail.com',
    //         subject: 'Successful Order Update',
    //         text: emailContent,
    //     };

    //     await transporter.sendMail(mailOptions);

    // } catch (err){
    //     console.log(err);
    //     return res.status(500).json({ error: 'An error occurred while the Email was being send!' });
    // }

    res.json("Successful Operation!");
}


module.exports = finishOrderHandler;