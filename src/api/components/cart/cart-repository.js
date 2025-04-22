const { Carts } = require('../../../models');

async function getAllCarts(startDate, endDate, limit, sort) {
  return Carts.find({
    date: { $gte: new Date(startDate), $lt: new Date(endDate) },
  })
    .select('-_id -products._id')
    .limit(limit)
    .sort({ id: sort });
}

async function getCartsByUserId(userId, startDate, endDate) {
  return Carts.find({
    userId,
    date: { $gte: new Date(startDate), $lt: new Date(endDate) },
  }).select('-_id -products._id');
}

async function getSingleCart(cartId) {
  return Carts.findOne({ id: cartId }).select('-_id -products._id');
}

async function countCarts() {
  return Carts.countDocuments();
}

async function createCart(newCartData) {
  return Carts.create(newCartData);
}

async function updateCart(cartId, updatedCartData) {
  return Carts.updateOne({ id: cartId }, { $set: updatedCartData });
}

async function deleteCart(cartId) {
  return Carts.deleteOne({ id: cartId });
}

module.exports = {
  getAllCarts,
  getCartsByUserId,
  getSingleCart,
  countCarts,
  createCart,
  updateCart,
  deleteCart,
};
