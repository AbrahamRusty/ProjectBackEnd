const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // ID unik untuk cart
    userId: { type: Number, ref: 'User', required: true }, // Referensi ke User
    date: { type: Date, required: true }, // Tanggal pembuatan cart
    products: [
        {
            productId: { type: Number, ref: 'Product', required: true }, // Referensi ke Product
            quantity: { type: Number, required: true } // Jumlah produk
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);