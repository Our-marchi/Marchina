const { db } =require('../../database/index.js')

const Product = db.Product; 
const Image = db.Image;

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Image },
                { model: db.Rating }
            ]
        });
        res.status(200).json({ products });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving products', error: err.message });
    }
};
// get a product by criteria (name, description, category)
const getProductByCriteria = async (req, res) => {
    const { name, description, category } = req.query;

  
    const queryConditions = {};

    if (name) {
        queryConditions.name = name;
    }
    if (description) {
        queryConditions.description = description;
    }
    if (category) {
        queryConditions.categorie = category; 
    }

    try {
      
        const product = await Product.findOne({ where: queryConditions,include:{model:Image},include:{model:db.Rating}});

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching product");
    }
};


const getAllProductsByUserId = async (req, res) => {
    const userId = req.params.userid;

    try {
        
        const products = await Product.findAll({ where: { userid: userId },include:[
            { model: Image },
            { model: db.Rating }
        ]});

        res.status(200).json({ products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching products for user' });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, stock, categorie, userid } = req.body;

    console.log('Request body:', req.body);

   

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    if (isNaN(parsedPrice) || isNaN(parsedStock)) {
        return res.status(400).json({ message: 'Price and stock must be valid numbers' });
    }

    try {
       
        const newProduct = await Product.create({
            name,
            description,
            price: parsedPrice,
            stock: parsedStock,
            categorie,
            userid 
        });

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    const id = req.params.productid; 
    const updatedFields = req.body; 

    try {
       
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

       
        const updatedProduct = await product.update(updatedFields);

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const id = req.params.productid;


    try {
        const result = await Product.destroy({ where: { productid: id } });

        res.status(200).send( 'Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

const getImageByProductId = async (req,res)=>{
    const ID =req.params.productid
    if(!ID){
        return res.status(400).json({message: 'product id is required'})
    }
    try {
        const images = await Image.findAll({where: {productid:ID }})
        if(images.length===0){
            return res.status(404).send("images not found")
        }
        res.status(200).json({images})
    } catch (err){
        console.error(err);
        res.status(500).send("err geting images")
    }
};
const getImageByUserId = async (req,res)=>{
    const ID =req.params.userid

    try {
        const images = await Image.findAll({where: {userid:ID }})
        if(images.length===0){
            return res.status(404).send("images not found")
        }
        res.status(200).json({images})
    } catch (err){
        console.error(err);
        res.status(500).send("err geting images")
    }
};
// update image
const UpdateImages = async (req, res) => {
    try {
        console.log('Request Params:', req.params);
        console.log('Request Body:', req.body);
      
        const { imageid } = req.params;
        const { newImageData } = req.body;
        
        await Image.update(newImageData,{where:{imageid}});

        return res.status(200).json({ message: 'Image updated successfully' });

    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'An error occurred while updating the image' });
    }
};
const deleteImage = async (req, res) => {
    const id = req.params.imageid;
    try {
        const deleteResult = await Image.destroy({ where: { imageid: id } });
        if (deleteResult) {
            res.status(200).send('Image deleted successfully: ' + id);
        } else {
            res.status(404).send('Image not found: ' + id);
        }
    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ message: 'Error deleting image', err: err.message });
    }

   
}
const addImagebyProductId = async (req, res) => {
    const { productid } = req.params;
    const { imageurl } = req.body;

    try {
 
       await Image.create({
            imageurl,
            productid
        });
        res.status(201).json({ message: 'Image added successfully' });
    } catch (error) {
        console.error('Error adding image:', error);
        res.status(500).json({ message: 'Error adding image', error: error.message });
    }
};


module.exports = {
    getAllProducts,  
    getProductByCriteria,
    getAllProductsByUserId,
    addImagebyProductId,
    createProduct,
    updateProduct,
    deleteProduct,
    getImageByProductId,
    getImageByUserId,
    UpdateImages,
    deleteImage}