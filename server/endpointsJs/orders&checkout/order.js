async function getOrderHandler(req, res) {
    const orderId = req.params.orderId;
    const {userId} = req.body;

    console.log(orderId);
    console.log(userId);
}


module.exports = getOrderHandler;