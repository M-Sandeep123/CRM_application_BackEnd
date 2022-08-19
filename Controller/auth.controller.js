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
            userName: req.body.email
        };

        /**
         * Check if email provided by user is already exist in dataBase/not
         */
         const Umail = await User.findOne({email: userObj.email});
         if (Umail) {
             return res.status(403).send({
                 message: "Try any other email, this email is already registered!"
             });
         }

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

/**
 * This function if the SignIn/login 
 */

exports.signIn = async (req, res) => {
    try {

        /**
         * Read the data Credentials from the request body
         */
        const userName = req.body.email;
        const password = req.body.password;

        /**
         * find the user with the data in database
         */
        const user = await User.findOne({ userName: userName });
        //need basic email validation
        if (!user) {
            return res.status(401).send({
                message: "This email has not been registered!"
            });
        }

        /**
         * Now Ensure that the password from the request body is valid or not
         * ==> we get the password from the user is plain text(String), password in the database is encrypt form
         */
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).send({
                message: "Invalid Credentials!"
            });
        }

        /**
         * If both data is valid we generate the acces token (JWT based token)
         */
        const token = jwt.sign({
            user_id: user._id
        }, authConfig.secert, {
            expiresIn: 600
        });

        /**
         * Send the response back to user
         */
        res.status(200).send({
            email: user.email,
            name: user.firstName + user.lastName,
            isAuthenticated: token
        });


    } catch (err) {
        console.log("Error while User login to the accout", err.message);
        res.status(500).send({
            message: "Internal server error while login"
        });
    }
}