/**
 * This file contains the product controller logic
 */

const product = require("../Model/product.model");


exports.productAdd = async (req, res) => {
    try {
        /**
         * 1 : Ensure that only admin access this endpoint
         * we can validate this in middleware // authJwt.middleWare.js
         */

        /**
         * 2 : Read the product data from request data and save in object
         */
        const productObj = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            availableItems: req.body.availableItems,
            imageUrl: req.body.imageUrl
        }

        if (!productObj.name || !productObj.category || !productObj.price || !productObj.description || !productObj.manufacturer || !productObj.availableItems || !productObj.imageUrl) {
            return res.status(401).send({
                message: "Provide required product credintials"
            });
        }

        /**
         * 3 : Create the product data and store in the database
         */

        const productSaved = await product.create(productObj);

        /**
         * 4 : Send back the request to the user/admin
         */

        res.status(200).send(productSaved);


    } catch (err) {
        console.log("Error While creating the Product : ", err.message);
        res.status(500).send({
            message: "Internal server error while creating the product"
        });
    }
}

/**
 * searching the product details based on the requirement
 */
exports.productsDetails = async (req, res) => {
    try {
        /**
         * Read the required data from the query parameters of the URL
         */

        const cat = (req.query.category != undefined) ? req.query.category : "";
        const direction = (req.query.direction != undefined) ? ((req.query.direction == "ASC") ? 1 : -1) : -1;
        const name = (req.query.name != undefined) ? req.query.name : "";
        const sortBy = (req.query.sortBy != undefined) ? req.query.sortBy : "_id";

        /**
         * Fetching the data from the database
         */

        const sortAc ={};
        sortAc[sortBy] = direction;

        /**
         * Sending response according to the user requirement 
         * 1 : Only user wants only perticular product category data
         * 2 : only user wants only perticular product data by Name of the product and
         * 3 : User does not provide any specification we send all products data to the user
         */

        if (cat && !name) {
            const productData = await product.find({ category: cat }).sort(sortAc);
            return res.status(200).send(productData);
        } else if (!cat && name) {
            const productData = await product.find({ name: name }).sort(sortAc);
            return res.status(200).send(productData);
        } else if (!cat && !name) {
            const productData = await product.find().sort(sortAc);
            return res.status(200).send(productData);
        } else {
            const productData = await product.find({ category: cat, name: name }).sort(sortAc);

            /**
             * Send the response to the user
             */

            res.status(200).send(productData);
        }

    } catch (err) {
        console.log("Error while fetching the product details : ", err.message);
        res.status(500).send({
            message: "Internal server Error while fetching the product details"
        });
    }
}

/**
 * searching the product categories
 */

exports.productCategory = async (req, res) => {
    try {
        /**
         * We find the all types categories in product collection
         */

        const products = await product.find();
        if (!products) {
            return res.status(404).send({
                message: "No product available on this category!"
            });
        }
        const set = new Set();
        products.forEach(val => {
            set.add(val.category);
        });
        const arr = [];
        set.forEach(ele => {
            arr.push(ele);
        });

        /**
         * send response back to the user 
         */

        res.status(200).send(arr.sort());



    } catch (err) {
        console.log("Error while fetching the product details");
        res.status(500).send({
            message: "Internal server error while fetching the product data"
        });
    }
}

/**
 * Searching the product based on the Id
 */
exports.productId = async (req, res) => {
    try {
        /**
         * Read the product Id from the URI/path parameter
         */
        const productId = req.params.id;
        const productData = await product.findById(productId);
        if (!productData) {
            return res.status(404).send({
                message: `No Product found for ID - ${productId}!`
            });
        }

        /**
         * Send response to the user
         */

        res.status(200).send(productData);

    } catch (err) {
        console.log("Error while fetching the product : ", err.message);
        res.status(500).send({
            message: "Internal server error while fetching the data"
        });
    }
}

/**
 * Updating the product in the database
 */
exports.updateProduct = async (req, res) => {
    try {
        /**
         * Product update is done based on the product Id
         * read the product Id from the URI
         */
        const productId = req.params.id;

        const productData = await product.findById(productId);

        if (!productData) {
            return res.status(404).send({
                message: `No Product found for ID - ${productId}!`
            });
        }

        /**
         * Read the updated data from the request body
         */
        productData.name = req.body.name ? req.body.name : productData.name;
        productData.availableItems = req.body.availableItems ? req.body.availableItems : productData.availableItems;
        productData.price = req.body.price ? req.body.price : productData.price;
        productData.category = req.body.category ? req.body.category : productData.category;
        productData.description = req.body.description ? req.body.description : productData.description;
        productData.imageUrl = req.body.imageUrl ? req.body.imageUrl : productData.imageUrl;
        productData.manufacturer = req.body.manufacturer ? req.body.manufacturer : productData.manufacturer;

        const dataUpdated = await productData.save();

        /**
         * Send updated response to the user
         */
        res.status(200).send(dataUpdated);


    } catch (err) {
        console.log("Error while updating the product details : ", err.message);
        res.status(500).send({
            message: "Internal server error while updating the product details"
        });
    }
}

/**
 * Controller for deleting the product based on the Id
 */
exports.deleteProduct = async (req, res) => {
    try {
        /**
         * Read the product Id from the URI
         */
        const productId = req.params.id;

        const productData = await product.findById(productId);
        if (!productData) {
            return res.status(404).send({
                message: `No Product found for ID - ${productId}!`
            });
        }

        await productData.remove();
        res.status(200).send(`product whith Id - ${productId} deleted successfully`);

    } catch (err) {
        console.log("Error while deleting the product data : ", err.message);
        res.status(500).send({
            message: "Internal server error while deleting the product data"
        });
    }
}