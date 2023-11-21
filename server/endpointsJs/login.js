const { verifyPassword, createToken } = require("../createTokenHashPassVerifyPass");
const User = require("../schemas/userSchema");


async function loginHandler(req, res) {
    const {email, password} = req.body;

    const emailValidation = validateEmail(email);
    if (!emailValidation) {
        return res.status(400).json({ error: 'Email does not match the validation criteria!' });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation) {
        return res.status(400).json({ error: 'Password does not match the validation criteria!' });
    }

    try {
        var user = await User.findOne({email});
    
    } catch {
        return res.status(400).json({ error: 'An Error occured while the User was searched in the Database!' });
    }
    
    try {
        var passwordValidity = await verifyPassword(password, user.password);
    
    } catch {
        return res.status(400).json({ error: 'An Error occured while the password was being decrypted from the Database!' });   
    }

    if (passwordValidity) {
        const token = createToken(user._id, user.email, user.user);

        console.log(`User: ${user.username} with email: ${user.email} successfully logged in!`);
        res.json({token, username: user.username, email: user.email, id: user._id, isAdministrator: user.isAdministrator});
    
    } else {

        return res.status(403).json({ error: 'Password is not valid!' });
    }
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
  
  
function validatePassword(password) {
    password = password.split("");
    const uppercaseChars = password.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
    const digits = password.filter(char =>char.charCodeAt() >= 48 && char.charCodeAt() <= 57);
    if (password.length < 6 || !uppercaseChars || !digits) {
        return false;
    }
    return true;
}


module.exports = loginHandler;
