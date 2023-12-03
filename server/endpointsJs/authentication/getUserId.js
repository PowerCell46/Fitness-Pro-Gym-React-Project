const {validateToken} = require("../../utilities/createTokenHashPassVerifyPass");


function getUserId(req, res) {
    const { token } = req.body; 
    const decodedToken = validateToken(token);

    if (decodedToken === null) {
        return res.status(400).json({ error: 'Invalid Authentication Token!' });
    }

    res.json({userId: decodedToken._id});
}


module.exports = getUserId;