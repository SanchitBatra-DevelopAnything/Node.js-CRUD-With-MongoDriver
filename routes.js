const express = require('express');
const router = express.Router();

const path = require('path');

const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const appController = require('./controllers/appControllers');

router.get('/',appController.getHome);

router.get('/add',appController.getAddProduct);

router.post('/add',appController.postAddProduct);

router.get('/details/:bookID',appController.details);

router.get('/edit/:bookId' , appController.getEditProduct);

router.post('/edit/:bookId',appController.postEditProduct);

router.post('/delete/:bookId',appController.postDeleteProduct);

router.post('/cart' , appController.postCart);

router.get('/cart',appController.getCart);

module.exports = router;