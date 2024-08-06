



module.exports=(sequelize,DataTypes)=>{

    const Rating=sequelize.define("rating",{
       
            ratingid:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true



        },
        rating:{
            type:DataTypes.INTEGER,
            allowNull:false


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



return Rating;


}