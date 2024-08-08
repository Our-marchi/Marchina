const express = require('express');
const cartRouter = express.Router();
const { deleteCart, addCart, getCartProducts } = require('../../controller/whishlistController/CartController');

cartRouter.post('/add', addCart);
cartRouter.get('/:userid', getCartProducts);
cartRouter.delete('/:cartid', deleteCart);

module.exports = { cartRouter };