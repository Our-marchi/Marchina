const {  
    deleteCart,addCart,getCartProducts
  }=require('../../controller/whishlistController/CartController')
const cartRouter=require('express').Router()





cartRouter.post('/addCart',addCart)
cartRouter.get('/:userid',getCartProducts)
cartRouter.delete('/:cartid',deleteCart)


module.exports={cartRouter}