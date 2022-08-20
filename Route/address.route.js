/**
 * This file contains the Address routes
 */

const addressController = require("../Controller/shippingAddress.controller");
const tokenValidation = require("../MiddleWare/authJwt.middleWare");
const userValidation = require("../MiddleWare/auth.middleWare");

module.exports = (app)=>{
    /**
     * The API call for creating address api
     * The end point => '/addresses'
     */
    app.post("/addresses",[tokenValidation.verifyToken,tokenValidation.validZipCode,userValidation.validNumber],addressController.address);
    
}