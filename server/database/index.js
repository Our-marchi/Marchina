const { Sequelize,DataTypes } = require('sequelize');
const sequelize=new Sequelize('el_marchi',"root","root",{host:'localhost',dialect:'mysql',module_dialect:'mysql2'})


const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize

db.Product=require('../database/model/Productmodel.js')(sequelize,DataTypes)
db.User=require('../database/model/Usermodel.js')(sequelize,DataTypes)
db.Cart=require('../database/model/Cartmodel.js')(sequelize,DataTypes)

db.Image=require('../database/model/imagemodel.js')(sequelize,DataTypes)
db.Wishlist=require('../database/model/Wishlistmodel.js')(sequelize,DataTypes)
db.Rating=require('../database/model/Ratingmodel.js')(sequelize,DataTypes)



db.User.hasMany(db.Cart,{foreignKey:'userid'})
db.Cart.belongsTo(db.User,{foreignKey:'userid'})


db.User.hasMany(db.Product,{foreignKey:'userid'})
db.Product.belongsTo(db.User,{foreignKey:'userid'})


db.User.hasMany(db.Wishlist,{foreignKey:'userid'})
db.Wishlist.belongsTo(db.User,{foreignKey:'userid'})



db.User.hasMany(db.Rating,{foreignKey:'userid'})
db.Rating.belongsTo(db.User,{foreignKey:'userid'})




db.Product.hasMany(db.Cart,{foreignKey:'productid'})
db.Cart.belongsTo(db.Product,{foreignKey:'productid'})



db.Product.hasMany(db.Rating,{foreignKey:'productid'})
db.Rating.belongsTo(db.Product,{foreignKey:'productid'})


db.Product.hasMany(db.Image,{foreignKey:'productid'})
db.Image.belongsTo(db.Product,{foreignKey:'productid'})


db.Product.hasMany(db.Wishlist,{foreignKey:'productid'})
db.Wishlist.belongsTo(db.Product,{foreignKey:'productid'})







sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

sequelize.sync()
.then(() => {
console.log('Tables created successfully!');
})
.catch((error) => {
console.error('Unable to create tables:', error);
});

module.exports= {db}
