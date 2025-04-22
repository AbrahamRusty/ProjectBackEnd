const mongoose = require('mongoose');
const Cart = require('./cartModel');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// GET all carts
exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching carts', error });
    }
};

// GET a single cart by ID
exports.getSingleCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

// POST a new cart
exports.addCart = async (req, res) => {
    try {
        const { id, userId, date, products } = req.body;

        // Buat dokumen baru
        const newCart = new Cart({ id, userId, date, products });
        const savedCart = await newCart.save();

        res.status(201).json({ message: 'Cart created', cart: savedCart });
    } catch (error) {
        console.error('Error creating cart:', error); // Tambahkan log error
        res.status(500).json({ message: 'Error creating cart', error });
    }
};

// PUT to update a cart
exports.editCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json({ message: 'Cart updated', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
};

// DELETE a cart
exports.deleteCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedCart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json({ message: 'Cart deleted', cart: deletedCart });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart', error });
    }
};