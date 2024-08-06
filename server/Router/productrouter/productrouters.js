const express = require('express');
const routerproduct = express.Router();
const {
    getAllProducts, getProductByCriteria,
    getAllProductsByUserId,
    createProduct,
    updateProduct,
    deleteProduct,
    getImageByProductId,
    getImageByUserId,
    addImagebyProductId,
    UpdateImages,
    deleteImage}= require('../../controller/productscontrollers/productcontrollers.js')


routerproduct.get('/getall', getAllProducts);
routerproduct.get('/products/search', getProductByCriteria);
routerproduct.get('/user/:userid', getAllProductsByUserId);
routerproduct.get('/images/:productid',getImageByProductId)
routerproduct.get('/images/user/:userid',getImageByUserId)
routerproduct.post('/add', createProduct);
routerproduct.post('/images/:productid', addImagebyProductId);
routerproduct.put('/up/:productid', updateProduct);
routerproduct.put('/images/:imageid', UpdateImages);
routerproduct.delete('/delete/:productid', deleteProduct);
routerproduct.delete('/images/:imageid',deleteImage)




module.exports = routerproduct;

