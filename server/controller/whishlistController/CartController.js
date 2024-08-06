

const { db } = require('../../database/index')



async function getCartProducts(req, res) {
  try {
    const userId = req.params.userid

    if (!userId) {
      return res.status(400).send({ error: 'User ID is required' });
    }

    const cartItems = await db.Cart.findAll({
      where: {
        userid: userId
      },
      include: [
        {
          model: db.Product,
          include:{
            model:db.Image,
          }
        },
        {
          model: db.User,
          attributes: ['userid']
        }
      ]
    });
    res.send(cartItems);
  } catch (error) {
    console.error('Error fetching cart products:', error);
    res.status(500).send({ error: 'An error occurred while fetching cart products' });
  }
}

const addCart=async(req,res)=>{
  try {
    const {userid,productid}=req.body
    await db.Cart.create({userid,productid});
    res.status(200).send('Product added to Cart');
  }
   catch (error) {
    console.log('Error adding product to Cart:', error);
    res.status(500).send({ error: 'An error occurred while adding product to Cart' });
  }
};


  const deleteCart = async (req, res) => {
    try {
      let cartId = req.params.id; 
  
     
      await db.Cart.destroy({
        where: {
          cartid: cartId 
        }
      });
  
      res.status(200).send('Deleted all cart  for userId: ' + cartId);
    } catch (error) {
      console.error(error);
      
    }
  };

  



  module.exports={
    deleteCart,addCart,getCartProducts
  }
