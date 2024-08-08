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
          include: {
            model: db.Image,
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

const addCart = async (req, res) => {
  try {
    const { userid, productid } = req.body
    const newCartItem = await db.Cart.create({ userid, productid });
    res.status(201).send({ message: 'Product added to Cart', cartItem: newCartItem });
  } catch (error) {
    console.error('Error adding product to Cart:', error);
    res.status(500).send({ error: 'An error occurred while adding product to Cart' });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartid;

    const deletedCount = await db.Cart.destroy({
      where: {
        cartid: cartId
      }
    });

    if (deletedCount === 0) {
      return res.status(404).send({ error: 'Cart item not found' });
    }

    res.status(200).send({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).send({ error: 'An error occurred while deleting the cart item' });
  }
};

module.exports = {
  getCartProducts,
  addCart,
  deleteCart
}