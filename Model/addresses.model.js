/**
 * This file contains the Schema of the addressres
 */

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    contactNumber : {
        type : Number,
        required : true
    },
    street : {
        type : String,
        required : true
    },
    landmark : {
        type : String,
        Option : true,
    },
    state : {
        type : String,
        required : true
    },
    zipCode : {
        type : String,
        required : true,
    },
    createAt: {
        type: Date,
        default: () => {
            return Date.now();
        },
        immutable: true
    },
    upDateAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User",
    }
});

module.exports = mongoose.model("Address",addressSchema);