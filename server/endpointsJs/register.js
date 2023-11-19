const {hashPassword} = require("../createTokenHashPassVerifyPass")

async function registerHandler(req, res) {
    const {email, username, password} = req.body;

    const emailValidation = validateEmail(email);
    if (!emailValidation) {
        return res.json('Email is not valid!');
    }

    const usernameValidation = validateUsername(username);
    if (!usernameValidation) {
        return res.json('Username is not valid');
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation) {
        return res.json('Password is not valid');
    }

    const hashedPassword = await hashPassword(password);

    

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