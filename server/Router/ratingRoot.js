const {  addRating,getRatingbyP
    
  }=require('../controller/RatingController')
const RatingRouter=require('express').Router()





RatingRouter.post('/addRating',addRating)
RatingRouter.get('/:productid',getRatingbyP)


module.exports={RatingRouter}