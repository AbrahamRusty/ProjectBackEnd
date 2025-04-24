const express = require('express');
const router = express.Router();

const productRoutes = require('./components/PRODUCTS/product-route');
const userRoutes = require('./components/USERS/user-route');
const cartRoutes = require('./components/CARTS/cart-routes');

router.use('/product', productRoutes); 
router.use('/user', userRoutes);       
router.use('/cart', cartRoutes); 


module.exports = router;
