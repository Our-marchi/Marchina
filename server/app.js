const express = require("express");
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
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/WhishList",whishListRouter)
app.use('/api/user',userRouter)

app.use("api/CartRouter",cartRouter)
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
