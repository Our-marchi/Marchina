module.exports=( sequelize, DataTypes )=>{
    

    // const User = require('../models/usersmodel'); 
     
    const Product = sequelize.define('Product', {
        productid:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
    
    
        },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.DECIMAL(10,3),
        allowNull: false
      },

      stock:{
        type: DataTypes.INTEGER,
        allowNull: false



      },
      categorie:{
        type:DataTypes.STRING,
        allowNull:false

      },
      userid:{
        type:DataTypes.INTEGER,
        foreignKey:true,
        allowNull:false
        

      }
    
    });
    
    // Product.belongsTo(User); //  the User-Product relationship
    
    return Product 
     }
    