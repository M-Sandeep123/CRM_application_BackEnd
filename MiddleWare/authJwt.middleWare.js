/**
 * This file contains the User varification for accessing the APIs
 */

const jwt = require("jsonwebtoken");
const config = require("../Configs/auth.config");
const User = require("../Model/user.model");

const verifyToken = (req,res,next)=>{
    /**
     * If the token is present
     */
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message : "Please login first to access this endpoint!"
        });
    }

    /**
     * if token is valid
     */
     jwt.verify(token,config.secert,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message : "Invaid token"
            });
        }
        console.log("token is valid");
        
        /**
        * Fetch the userID from the token and set it to the request object
        */
       req.user = decoded.user_id; // decode the userId from the token
       next();

    });
}

/**
 * Validate the ZipCode
 */

 const validZipCode = (req,res,next)=>{
    const regEgx = /^([0-9]){6}$/;
    if (!regEgx.test(req.body.zipCode)) {
        return res.status(401).send({
            message: "Invalid zipCode!"
        });
    }

    next();
}


module.exports = {
    verifyToken : verifyToken,
    validZipCode : validZipCode
}