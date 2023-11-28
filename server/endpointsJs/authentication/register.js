const { hashPassword, createToken } = require("../../utilities/createTokenHashPassVerifyPass");
const User = require("../../schemas/userSchema");
const fs = require("fs");
const {validateEmail, validatePassword, validateUsername} = require("../../utilities/validators");


async function registerHandler(req, res) {
    const { email, username, password } = req.body;

    const emailValidation = validateEmail(email);
    if (emailValidation !== true) {
        return res.status(400).json({ error: 'Email does not match the validation criteria!' });
    }

    const usernameValidation = validateUsername(username);
    if (usernameValidation !== true) {
        return res.status(400).json({ error: 'Username does not match the validation criteria!' });
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
        return res.status(400).json({ error: 'Password does not match the validation criteria!' });
    }

    // Making the request with Valid Email, Username and Password
    try {
        let previousUser = await User.find({ email });

        if (previousUser.length > 0) {
            return res.status(409).json({ error: "Email already in use!" });
        }

        previousUser = await User.find({ username });

        if (previousUser.length > 0) {
            return res.status(409).json({ error: "Username already in use!" });
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error -> (Searching for the Users)' });
    }


    try {
        var hashedPassword = await hashPassword(password);

    } catch {
        return res.status(500).json({ error: 'An Error occured while the password was being Hashed!' });
    }

    try {
        var user = new User(
            {
                email,
                username,
                password: hashedPassword,
                isAdministrator: (username === 'PowerCell46' || username === 'PowerCellGaming') ? true : false
            }
        );

        user.save();

    } catch {
        return res.status(500).json({ error: 'An Error occured while the User was being written on the Database!' });
    }

    try {
        var token = createToken(user._id, email, username, user.isAdministrator);

    } catch {
        return res.status(500).json({ error: 'An Error occured while the Authentication Token was being created!' });
    }

    try {
        var imageData = await fs.promises.readFile(`${user.imageLocation}`, { encoding: "base64" });

    } catch {
        return res.status(500).json({ error: 'An Error occured while the Image was being converted!' });
    }


    console.log(`User: ${user.username} with email: ${user.email} successfully Registered!`);


    res.json({ token, username: user.username, email: user.email, id: user._id, isAdministrator: user.isAdministrator, image: imageData });
}


module.exports = registerHandler;