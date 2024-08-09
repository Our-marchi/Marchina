const express = require("express");
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const cors = require("cors");
const {whishListRouter} = require('./Router/whislistRouter/whishlistRouter.js')
const{cartRouter}=require('./Router/whislistRouter/CartRouter.js')
const{RatingRouter}=require('./Router/ratingRoot.js')
const routerproduct=require('./Router/productrouter/productrouters.js')
const uploadImage = require("./uploadImage.js");
const userRouter=require('./Router/userRouter/userRouter.js')
const { mailerRouter } = require('./Router/nodemailRouter.js/nodeMailRouter.js');

const app = express();
const port = 5000;





app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "25mb" }));


app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

app.use("/api/WhishList",whishListRouter)
app.use('/api/user',userRouter)

app.use("/api/cart", cartRouter)
console.log("Cart routes registered");
app.use("api/RatingRouter",RatingRouter)
app.use("/api/product", routerproduct)
app.use(mailerRouter)

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.post("/uploadMultipleImages", (req, res) => {
  uploadImage
    .uploadMultipleImages(req.body.images)
    .then((urls) => res.send(urls))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});