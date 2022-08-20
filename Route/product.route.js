/**
 * This file contains the product related route
 * 
 */
const validation = require("../MiddleWare/authJwt.middleWare");
const productController = require("../Controller/product.controller")

module.exports = (app)=>{
    /**
     * Defining the Route of creating the product
     * Endpoint ==> POST /crm/api/project/products
     */
    app.post("/products",[validation.verifyToken,validation.isAdmin],productController.productAdd);

    /**
     * Searching the product details on requirement
     * Endpoinit ==> GET /products
     */
    app.get("/products",productController.productsDetails);

    /**
     * Searching the category of the product
     * Endpoint ==> GET /products/category
     */
    app.get("/products/category",productController.productCategory);

    /**
     * searching the product based on the Id
     * Endpoint ==> GET /products/{id}
     */
    app.get("/products/:id",productController.productId);

    /**
     * Defining endpoint to update the product data based on the Id
     * Endpoint ==> PUT /products/{id}
     */
    app.put("/products/:id",[validation.verifyToken,validation.isAdmin],productController.updateProduct);

    /**
     * Definging endpoint to delete the product data based on the product Id
     * Endpoint ==> DELETE /products/{id}
     */
    app.delete("/products/:id",[validation.verifyToken,validation.isAdmin],productController.deleteProduct);
}