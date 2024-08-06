const { db } = require('../../database/index')

async function getWishlistProducts(req, res) {
  console.log("test");
  try {
    const user = req.params.userid;

    const wishlistItems = await db.Wishlist.findAll({
      where: {
        userid: user
      },
      include: [
        {
          model: db.Product,
            include:[
              { model: db.Image },
              { model: db.Rating }
          ]
        },
        {
          model: db.User,
          attributes: ['userid']
        }
      ]
    });
console.log(wishlistItems)
    res.send(wishlistItems);
  } catch (error) {
    console.error('Error fetching WishList products:',error);
    res.status(500).send({ error: 'An error occurred while fetching Wishlist products' });
  }
}

const addWishlist = async (req, res) => {
  try {
    const {userid,productid}=req.body

     
    

    await db.Wishlist.create({userid,productid});
    res.status(200).send('Product added to wishlist');
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).send({ error: 'An error occurred while adding product to wishlist' });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const {Wishlistid} = req.params;

    await db.Wishlist.destroy({
      where: {
        Wishlistid
      }
    });

    res.status(200).send('Deleted wishlist item');
  } catch (error) {
    console.error('Error deleting wishlist item:', error);
    res.status(500).send({ error: 'An error occurred while deleting wishlist item' });
  }
};

module.exports = {
  getWishlistProducts,
  addWishlist,
  deleteWishlist
};
