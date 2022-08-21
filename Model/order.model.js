/**
 * This file contains the Order Schema
 */

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Product",
        required : true
    },
    addressId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Address",
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        default : 1
    },
    amount : {
        type : Number,
        required : true
    },
    orderDate : {
        type : Date,
        default : ()=>{
            return Date.now();
        },
        immutable : true,
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User",
        required : true
    }
});

module.exports = mongoose.model("Order",orderSchema);