const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
    return jwt.sign(
        {
            id: user.rows[0].IDUSER,
            email: user.rows[0].EMAIL,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );
}
exports.generateValidToken = generateToken;