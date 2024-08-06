



module.exports=(sequelize,DataTypes)=>{

    const Cart=sequelize.define("cart",{
       
       cartid:{
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



return Cart ;


}