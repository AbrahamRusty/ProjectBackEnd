
const express = require('express');
const cartsController = require('./cart-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/carts', route);

  // Get all carts with optional filter/sort
  route.get('/', cartsController.getAllCarts);

  // Get a cart by id
  route.get('/:id', cartsController.getSingleCart);

  // Get carts by userId
  route.get('/user/:userid', cartsController.getCartsByUserId);

  // Create a new cart
  route.post('/', cartsController.addCart);

  // Update a cart
  route.put('/:id', cartsController.editCart);
  route.patch('/:id', cartsController.editCart);

  // Delete a cart
  route.delete('/:id', cartsController.deleteCart);
};

