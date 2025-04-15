const Cart = require('./cart-repository');

/**
 * Get all carts with optional limit, sort, and date range
 */
async function getAllCarts(limit, sort, startDate, endDate) {
  return await Cart.find({
    date: { $gte: new Date(startDate), $lt: new Date(endDate) },
  })
    .select('-_id -products._id')
    .limit(limit)
    .sort({ id: sort });
}

/**
 * Get carts by user ID with optional date range
 */
async function getCartsByUserId(userId, startDate, endDate) {
  return await Cart.find({
    userId,
    date: { $gte: new Date(startDate), $lt: new Date(endDate) },
  }).select('-_id -products._id');
}

/**
 * Get a single cart by cart ID
 */
async function getSingleCart(cartId) {
  return await Cart.findOne({ id: cartId }).select('-_id -products._id');
}

/**
 * Add a new cart
 */
async function addCart(userId, date, products) {
  const cartCount = await Cart.countDocuments();

  const newCart = new Cart({
    id: cartCount + 1,
    userId,
    date,
    products,
  });

  return await newCart.save();
}

/**
 * Edit a cart by ID
 */
async function editCart(cartId, userId, date, products) {
  const result = await Cart.updateOne(
    { id: cartId },
    { userId, date, products }
  );

  return result.modifiedCount > 0;
}

/**
 * Delete a cart by ID
 */
async function deleteCart(cartId) {
  const result = await Cart.deleteOne({ id: cartId });
  return result.deletedCount > 0;
}

module.exports = {
  getAllCarts,
  getCartsByUserId,
  getSingleCart,
  addCart,
  editCart,
  deleteCart,
};
