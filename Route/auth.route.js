/**
 * This file contains the End points of User SignUp and SignIn
 */

const authController = require("../Controller/auth.controller");
const authMiddleWare = require("../MiddleWare/auth.middleWare");

module.exports = (app) => {
    /**
     * Defining the Route for the SignUp user
     * POST crm/api/project/users
     */
    app.post("/crm/api/project/users",[authMiddleWare.validUserData],authController.signUp);
}