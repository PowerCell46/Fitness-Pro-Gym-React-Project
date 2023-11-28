const { verifyPassword, createToken } = require("../../utilities/createTokenHashPassVerifyPass");
const User = require("../../schemas/userSchema");
const fs = require("fs");
const {validatePassword, validateEmail} = require("../../utilities/validators");


async function loginHandler(req, res) {
    const { email, password } = req.body;

    const emailValidation = validateEmail(email);
    if (emailValidation !== true) {
        return res.status(400).json({ error: 'Email does not match the validation criteria!' });
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
        return res.status(400).json({ error: 'Password does not match the validation criteria!' });
    }


    // Making the request with Valid Email and Password
    try {
        var user = await User.findOne({ email });

        if (user === null) {
            return res.status(400).json({ error: 'No such user found!' });
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error -> (Searching for the User)' });
    }


    try {
        var passwordValidity = await verifyPassword(password, user.password);

    } catch {
        return res.status(500).json({ error: 'An Error occured while the password was being decrypted!' });
    }

    if (passwordValidity) {
        var token = createToken(user._id, user.email, user.user);

    } else {
        return res.status(403).json({ error: 'Password is not valid!' });
    }

    try {
        var imageData = await fs.promises.readFile(`${user.imageLocation}`, { encoding: "base64" });

    } catch {
        return res.status(500).json({ error: 'An Error occured while the Image was being converted!' });
    }

    console.log(`User: ${user.username} with email: ${user.email} successfully Logged in!`);

    return res.json({ token, username: user.username, email: user.email, id: user._id, isAdministrator: user.isAdministrator, image: imageData });
}


module.exports = loginHandler;
