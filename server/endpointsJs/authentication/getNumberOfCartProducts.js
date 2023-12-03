const User = require("../../schemas/userSchema");
const {validateToken} = require("../../utilities/createTokenHashPassVerifyPass");


async function getNumberOfCartProducts(req, res) {
    const {token} = req.body;

    const decodedToken = validateToken(token);

    if (decodedToken === null) {
        return res.status(400).json({ error: 'Invalid Authentication Token!' });
    }

    try {
        var user = await User.findOne({ _id: decodedToken._id });

        if (user === null) {
            return res.status(400).json({ error: 'No such user found!' });
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching for the user' }); // searching for the user crashed
    }

    res.json(user.cart.length);
}


module.exports = getNumberOfCartProducts;