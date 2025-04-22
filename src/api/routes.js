const express = require('express');
const router = express.Router();

const productRoutes = require('./components/product/product-route');
const userRoutes = require('./components/user/user-route');
const cartRoutes = require('./components/cart/cartRoutes');

router.use('/product', productRoutes); // ✅ OK
router.use('/user', userRoutes);       // ✅ OK
router.use('/cart', cartRoutes); 

let cart = []; // Simulasi data cart (gunakan database jika diperlukan)

// GET all cart items
router.get('/cart', (req, res) => {
    res.json(cart);
});

// POST a new cart item
router.post('/cart', (req, res) => {
    const newItem = req.body;
    newItem.id = cart.length + 1; // Tambahkan ID unik
    cart.push(newItem);
    res.status(201).json({ message: 'Item added to cart', item: newItem });
});

// PUT to update a cart item
router.put('/cart/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const index = cart.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        cart[index] = { ...cart[index], ...updatedItem };
        res.json({ message: 'Item updated', item: cart[index] });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE a cart item
router.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    const index = cart.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        const deletedItem = cart.splice(index, 1);
        res.json({ message: 'Item deleted', item: deletedItem });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

module.exports = router;
