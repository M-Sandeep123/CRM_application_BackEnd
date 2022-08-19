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
    app.post("/crm/api/project/users",[authMiddleWare.validEmail,authMiddleWare.validNumber],authController.signUp);

    /**
     * Defining the end point for the signIn 
     * End point ==> POST /crm/api/project/signIn
     */

    app.post("/crm/api/project/signIn",[authMiddleWare.validEmail],authController.signIn);
}