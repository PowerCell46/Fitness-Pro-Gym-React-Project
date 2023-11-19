const { verifyPassword, createToken } = require("../createTokenHashPassVerifyPass");
const User = require("../schemas/userSchema");

async function loginHandler(req, res) {
    const {email, password} = req.body;

    const emailValidation = validateEmail(email);
    if (!emailValidation) {
        return res.json('Email is not valid!');
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation) {
        return res.json('Password is not valid');
    }

    const user = await User.findOne({email});
    
    const passwordValidity = await verifyPassword(password, user.password);
    
    if (passwordValidity) {
        const token = createToken(user._id, user.email, user.user);

        console.log(`User: ${user.username} with email: ${user.email} successfully logged in!`);
        res.json(token);
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
