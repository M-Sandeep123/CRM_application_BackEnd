/**
 * This file contains the User Authentication Validations
 */

/**
 * First User SignUp validation
 */
const User = require("../Model/user.model");
const validUserData = async (req, res, next) => {
    /**
     * Email validation weather it is valid are invalid email id
     */
    const email = req.body.email;
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regEx.test(email)) {
        return res.status(400).send({
            message: "Invalid email-id format!"
        });
    } else {
        /**
         * Check if email provided by user is already exist in dataBase/not
         */
        const Umail = await User.findOne({ email: email });
        if (Umail) {
            return res.status(403).send({
                message: "Try any other email, this email is already registered!"
            });
        }
    }
    /**
     * Validate the contactNumber
     */
    const num = /^([0-9]){10}$/;
    if (!num.test(req.body.contactNumber)) {
        return res.status(400).send({
            message: "Invalid contactNumber!"
        });
    }

    next();
};

module.exports = {
    validUserData: validUserData
}