const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const decoded = jwt.verify(req.body.token, "api3");
        req.userData = decoded;
        console.log("verify acccess");
    } catch (error) {
        console.log("verify deny");
    }

    next();  //This is auth failure
};
