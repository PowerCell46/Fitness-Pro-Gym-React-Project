const {hashPassword, createToken} = require("../createTokenHashPassVerifyPass");
const User = require("../schemas/userSchema");


async function registerHandler(req, res) {
    const {email, username, password} = req.body;

    const emailValidation = validateEmail(email);
    if (!emailValidation) {
        return res.status(400).json({ error: 'Email does not match the validation criteria!' });
    }

    const usernameValidation = validateUsername(username);
    if (!usernameValidation) {
        return res.status(400).json({ error: 'Username does not match the validation criteria!' });
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation) {
        return res.status(400).json({ error: 'Password does not match the validation criteria!' });
    }

    try {
        let previousUser = await User.find({email});
        if (previousUser) {
            return res.status(409).json({error: "Email already in use!"});
        }
        previousUser = await User.find({username});
        if (previousUser) {
            return res.status(409).json({error: "Username already in use!"});
        }
    } catch {

    }


    try {
        var hashedPassword = await hashPassword(password);
    
    } catch {
        return res.status(400).json({ error: 'An Error occured while hashing the password!' });
    }

    try {
        var user = new User({email, username, password: hashedPassword, isAdministrator: email === 'PowerCell46' ? true : false});
        user.save();
    
    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being written on the Database!' });
    } 

    try {
        var token = createToken(user._id, email, username, user.isAdministrator);
    
    } catch {
        return res.status(400).json({ error: 'An error occured while the authentication token was being created!' });
    }

    console.log(`User: ${user.username} with email: ${user.email} successfully registered!`);
    res.json(token);
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
  
  
  function validateUsername(username) {
      username = username.split("");
      const uppercaseChars = username.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
      if (username.length < 4 || !uppercaseChars) {
          return false;
      }
      return true;
}


module.exports = registerHandler;