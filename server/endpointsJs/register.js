const {hashPassword, createToken} = require("../createTokenHashPassVerifyPass");
const User = require("../schemas/userSchema");


async function registerHandler(req, res) {
    const {email, username, password} = req.body;

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
        let previousUser = await User.find({email});

        if (previousUser.length > 0) {
            return res.status(409).json({error: "Email already in use!"});
        }
        previousUser = await User.find({username});
        
        if (previousUser.length > 0) {
            return res.status(409).json({error: "Username already in use!"});
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error' }); // searching for the user crashed
    }


    try {
        var hashedPassword = await hashPassword(password);
    
    } catch {
        return res.status(500).json({ error: 'An Error occured while the password was being Hashed!' });   
    }

    try {
        var user = new User(
            {email, 
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
        var token = createToken(user._id, email, username, user.isAdministrator); // Profile Image ??? 
    
    } catch {
        return res.status(500).json({ error: 'An Error occured while the Authentication Token was being created!' });   
    }

    console.log(`User: ${user.username} with email: ${user.email} successfully Registered!`);
    
    res.json({token, username: user.username, email: user.email, id: user._id, isAdministrator: user.isAdministrator});
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
    const digits = password.filter(char =>char.charCodeAt() >= 48 && char.charCodeAt() <= 57);
    if (uppercaseChars.length === 0) {
        return `Password must have at least one Uppercase!`;
    
    } else if (digits.length === 0) {
        return `Password must have at least one Number!`;
    
    } else if (password.length < 6) {
        return `Password must be at least 6 characters!`;
    }

    return true;
}
  
  
function validateUsername(username) {
    username = username.split("");
    const uppercaseChars = username.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
    if (username.length < 4) {
        return 'Username must be at least 4 characters!';
    } else if (uppercaseChars.length === 0) {
        return `Username must have at leat one Uppercase!`;
    } 
     
    return true;
}


module.exports = registerHandler;