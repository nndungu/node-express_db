const jwt = require("jsonwebtoken");

module.exports = (user) => {
    // need 3 things to create a token: payload, secret, and options

    const payload = {
        id: user.id,
        username: user.username,

        // can add more non confidential data
    };

    const secret = process.env.SECRET || "development";

    const options = {
        expiresIn: "3h",
    };

    return jwt.sign(payload, secret, options);
};
