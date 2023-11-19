const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 13);
    return hashedPassword;
} 


function createToken(_id, email, username, isAdministrator) {
    const token = jwt.sign({_id, email, username, isAdministrator}, "PowerCell46" /*, {expiresIn: "1d"} */);
    return token;
}


async function verifyPassword(password, incryptedPassword) {
    return await bcrypt.compare(password, incryptedPassword);
}


module.exports = {hashPassword, createToken, verifyPassword};