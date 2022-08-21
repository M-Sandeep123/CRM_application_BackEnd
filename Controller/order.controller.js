/**
 * This file contains the Logic of Order Schema
 */

const Order = require("../Model/order.model");
const Product = require("../Model/product.model");
const Address = require("../Model/addresses.model");

exports.orderPlace = async (req, res) => {
    try {
        /**
         * Read the order details from the request object body
         */
        const orderObj = {
            addressId: req.body.addressId,
            productId: req.body.productId
        }
        const product = await Product.findById(orderObj.productId);
        if (!product) {
            return res.status(401).send({
                message: `No Product found for ID - <${req.body.productId}>!`
            });
        }
        orderObj.amount = product.price;
        const address = await Address.findById(orderObj.addressId);
        if (!address) {
            return res.status(401).send({
                message: `No Address found for ID - <${req.body.addressId}>!`
            });
        }

        if (req.body.quantity) {
            orderObj.quantity = req.body.quantity;
        } else {
            orderObj.quantity = 1;
        }
        orderObj.userId = req.user;

        const availableItems = product.availableItems;

        if (availableItems == 0 || product.availableItems-orderObj.quantity <= 0) {
            return res.status(401).send({
                message: `Product with ID - <${orderObj.productId}> is currently out of stock!`
            });
        } else {
            console.log(product.availableItems);
            product.availableItems = (product.availableItems)-orderObj.quantity;
            console.log(product.availableItems);
            await product.save();
        }

        const order = await Order.create(orderObj);
        /**
         * send response to the user
         */
        res.status(200).send(order);

    } catch (err) {
        console.log("Error while creating the order : ", err.message);
        res.status(500).send({
            message: "Internal server error while creating the order"
        });
    }
}