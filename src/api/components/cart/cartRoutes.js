const express = require('express');
const router = express.Router();
const cartController = require('./cartController');

// GET all carts
router.get('/', cartController.getAllCarts);

// GET a single cart by ID
router.get('/:id', cartController.getSingleCart);

// POST a new cart
router.post('/', cartController.addCart);

// PUT to update a cart
router.put('/:id', cartController.editCart);

// DELETE a cart
router.delete('/:id', cartController.deleteCart);

module.exports = router;