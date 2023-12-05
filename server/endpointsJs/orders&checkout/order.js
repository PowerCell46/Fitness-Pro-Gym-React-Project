const User = require("../../schemas/userSchema");

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
            return res.send({data: order[0]});
        }

    } catch {
        return res.status(500).json({ error: 'Error - Searching for the User' });
    }
}


module.exports = getOrderHandler;