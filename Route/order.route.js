/**
 * This file contains the Order related Routes
 */

const Order = require("../Controller/order.controller");
const userValidation = require("../MiddleWare/authJwt.middleWare");

module.exports = (app)=>{
    /**
     * Order placing API
     * Endpoint ==>  POST '/orders'
     */
    app.post("/orders",[userValidation.verifyToken,userValidation.isOwner],Order.orderPlace);
}