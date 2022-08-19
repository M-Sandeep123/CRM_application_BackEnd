/**
 * This file contains the User Authentication Validations
 */

/**
 * First User SignUp validation
 */
const User = require("../Model/user.model");

/**
 * Basic email validation
 */
const validEmail = (req,res,next)=>{
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(!regEx.test(req.body.email)){
        return res.status(401).send({
            message : "Invalid email-id format!"
        });
    }
    next();
}

const validNumber = (req,res,next)=>{
    const num = /^([0-9]){10}$/;
    if (!num.test(req.body.contactNumber)) {
        return res.status(401).send({
            message: "Invalid contactNumber!"
        });
    }

    next();
}

module.exports = {
    validEmail : validEmail,
    validNumber : validNumber
}