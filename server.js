/**
 * This file is starting point of the application
 */

/**
 * 1 : create the server
 * 2 : Connect the mongodb
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");
const serverConfig = require("./Configs/server.config");
const dbConfig = require("./Configs/db.Config");
const User = require("./Model/user.model");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error",()=>{
    console.log("DataBase is not connected");
});

db.once("open",()=>{
    console.log("DataBase is connected successfully");
    /**
     * To check api working I need to clear all the data already present the database
     */
    init();
});

async function init(){
    /**
     * Deleting the data from the database
     */
    await User.collection.drop();

    /**
     * Fro the backend processing we need a adminstrator(ADMIN)
     */
    const admin = await User.create({
        firstName : "Mudigonda",
        lastName : "sandeep",
        email : "mudigondasandeep01@gmail.com",
        password : bcrypt.hashSync("password",8),
        role : "ADMIN",
        contactNumber : 8688692077,
        userName : "mudigondasandeep01@gmail.com"
    });
    console.log(admin);
}

/**
 * Here we plugIn the server and application route
 */
require("./Route/auth.route")(app);

app.listen(serverConfig.PORT,()=>{
    console.log("Server is started at PORT : ", serverConfig.PORT);
})