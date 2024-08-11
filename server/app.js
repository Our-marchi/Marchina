// require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: require('path').resolve(__dirname, './..env') });
const express = require("express");
const cors = require("cors");
const { whishListRouter } = require('./Router/whislistRouter/whishlistRouter.js');
const { cartRouter } = require('./Router/whislistRouter/CartRouter.js');
const { RatingRouter } = require('./Router/ratingRoot.js');
const routerproduct = require('./Router/productrouter/productrouters.js');
const uploadImage = require("./uploadImage.js");
const userRouter = require('./Router/userRouter/userRouter.js');
const { mailerRouter } = require('./Router/nodemailRouter.js/nodeMailRouter.js');
const auth = require('./auth.js');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "25mb" }));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

app.use("/api/WhishList", whishListRouter);
app.use('/api/user', userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/RatingRouter", RatingRouter); 
app.use("/api/product", routerproduct);
app.use(mailerRouter);

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


app.get('/api/getAccesstoken', (req, res) => {
  const token = process.env.ACCESS_TOKEN
  res.json({ access_token: token })
});

app.get('/api/gmail/emails', async (req, res) => {
  const accessToken = req.query.access_token;
  try {
    const tokens = { access_token: accessToken };
    const emails = await auth.fetchEmails(tokens);
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ message: 'Error fetching emails' });
  }
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
