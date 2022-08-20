/**
 * This file contains the product Schema
 */

const mongoose = require("mongoose");

const prodectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    availableItems : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
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
    }
});

module.exports = mongoose.model("Product",prodectSchema);