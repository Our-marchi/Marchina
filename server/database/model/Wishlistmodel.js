



module.exports=(sequelize,DataTypes)=>{

    const Wishlist=sequelize.define("wishlist",{
       
        wishlistid:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true



        },

        productid:{
            type:DataTypes.INTEGER,
            foreignKey:true,
            allowNull:false
    
           },
           userid:{
            type:DataTypes.INTEGER,
            foreignKey:true,
            allowNull:false
            
    
           }







    })



return Wishlist ;


}