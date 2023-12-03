const { validateToken } = require("../../utilities/createTokenHashPassVerifyPass");


async function isAdministrator(req, res) {
    const {token} = req.body;

    const decodedToken = validateToken(token);
    
    if (decodedToken === null) {
        res.json({isAdministrator: false});

    } else {
        res.json({isAdministrator: decodedToken.isAdministrator});
    }
}


module.exports = isAdministrator;