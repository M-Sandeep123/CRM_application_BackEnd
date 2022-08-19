/**
 * This file contains the Shipping Address Controller logic
 * 
 */


const User = require("../Model/user.model");
const address = require("../Model/addresses.model");

exports.address = async (req,res)=>{
    try{
        
        /**
         * 1 : For this User must be varified and signIn the account
         * 2 : Read the address information from the request body
         */


         const addObj = {
             name : req.body.name,
             contactNumber : req.body.contactNumber,
             street : req.body.street,
             landMark : req.body.landMark,
             city : req.body.city,
             state : req.body.state,
             zipCode : req.body.zipCode,
             user : req.user
         }
 

        /**
         * Create and append the data in to database
         */
       
        
        const userId = await User.findOne({_id : req.user});
        const add = await address.create(addObj);

        res.status(200).send({
            _id: add._id,
            name : add.name,
            contactNumber: add.contactNumber,
            street: add.street,
            landMark: add.landmark,
            city: add.city,
            state: add.state,
            zipcode: 123456,
            createdAt: add.createAt,
            updatedAt: add.upDateAt,
            user : userId
        });
        

    }catch(err){
        console.log("Error While creating the address : ", err.message);
        res.status(500).send({
            message : "Internal server error while creating the address"
        });
    }
}