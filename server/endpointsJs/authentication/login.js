const { verifyPassword, createToken } = require("../../utilities/createTokenHashPassVerifyPass");
const User = require("../../schemas/userSchema");


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
        return res.status(500).json({ error: 'Internal Server Error' }); // searching for the user crashed
    }

    try {
        var passwordValidity = await verifyPassword(password, user.password);

    } catch {
        return res.status(500).json({ error: 'An Error occured while the password was being decrypted from the Database!' });
    }

    if (passwordValidity) {
        var token = createToken(user._id, user.email, user.user);

    } else {
        return res.status(403).json({ error: 'Password is not valid!' });
    }

    console.log(`User: ${user.username} with email: ${user.email} successfully Logged in!`);

    res.json({ token, username: user.username, email: user.email, id: user._id, isAdministrator: user.isAdministrator });
}


function validateEmail(email) {
    if (email.length < 5) {
        return `Email must be at least 5 characers!`;

    } else if (!email.includes("@")) {
        return `Email must include @ sign!`;

    } else if (!email.includes(".")) {
        return `Email must include . sign!`;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return `Email is not valid!`
    };

    return true;
}


function validatePassword(password) {
    password = password.split("");
    const uppercaseChars = password.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
    const digits = password.filter(char => char.charCodeAt() >= 48 && char.charCodeAt() <= 57);
    if (uppercaseChars.length === 0) {
        return `Password must have at least one Uppercase!`;

    } else if (digits.length === 0) {
        return `Password must have at least one Number!`;

    } else if (password.length < 6) {
        return `Password must be at least 6 characters!`;
    }

    return true;
}


module.exports = loginHandler;
