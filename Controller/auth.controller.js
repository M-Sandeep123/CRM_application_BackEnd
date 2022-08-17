/**
 * This file contains the Authentication of user
 * 
 */


/**
 * Here we create User SignUp and
 * 
 * user SignIn/Login logic functions
 */

const User = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../Configs/auth.config");

/**
 * Function have logic User can signUp
 */
exports.signUp = async (req, res) => {
    try {
        /**
         * read the user information for request body
         */
        const userObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            userName : req.body.email
        };

        /**
         * Set the user role by default it is USER
         */
        if (!req.body.role || userObj.req.body.role === "USER") {
            userObj.role = "USER";
        } else {
            userObj.role = req.body.role;
        }

        /**
         * Now create the user and store in database
         */
        const savedUser = await User.create(userObj);

        const postResponse = {
            _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email
        };

        /**
         * Send back the response to user
         */

        res.status(200).send(postResponse);

    } catch (err) {
        console.log("Error while creating the user : ", err.message);
        res.status(500).send({
            message: "Internal server error while creating the user"
        });
    }
}