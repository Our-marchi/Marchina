



module.exports=(sequelize,DataTypes)=>{

    const Image=sequelize.define("image",{
       
        imageid:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
    

        },
        imageurl:{
            type:DataTypes.STRING,
            allowNull:false,
           

        },
        productid:{
            type:DataTypes.INTEGER,
            foreignKey:true,
            allowNull:false
    

        }







    })



return Image ;


}