const cartsService = require('./cart-service');
const { errorResponder, errorTypes } = require('../../../CORE/errors');

async function getAllCarts(request, response, next) {
  try {
    const limit = Number(request.query.limit) || 0;
    const sort = request.query.sort === 'desc' ? -1 : 1;
    const startDate = request.query.startdate || '1970-01-01';
    const endDate = request.query.enddate || new Date();

    const carts = await cartsService.getAllCarts(limit, sort, startDate, endDate);
    return response.status(200).json(carts);
  } catch (error) {
    return next(errorResponder(errorTypes.DB, error.message));
  }
}

async function getCartsByUserId(request, response, next) {
  try {
    const userId = request.params.userid;
    const startDate = request.query.startdate || '1970-01-01';
    const endDate = request.query.enddate || new Date();

    const carts = await cartsService.getCartsByUserId(userId, startDate, endDate);
    return response.status(200).json(carts);
  } catch (error) {
    return next(errorResponder(errorTypes.DB, error.message));
  }
}

async function getSingleCart(request, response, next) {
  try {
    const cartId = request.params.id;
    const cart = await cartsService.getSingleCart(cartId);

    if (!cart) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Cart not found');
    }

    return response.status(200).json(cart);
  } catch (error) {
    return next(error);
  }
}

async function addCart(request, response, next) {
  try {
    const { userId, date, products } = request.body;

    if (!userId || !date || !products) {
      throw errorResponder(errorTypes.EMPTY_BODY, 'All fields are required');
    }

    const newCart = await cartsService.addCart(userId, date, products);
    return response.status(201).json(newCart);
  } catch (error) {
    return next(errorResponder(errorTypes.DB, error.message));
  }
}

async function editCart(request, response, next) {
  try {
    const cartId = parseInt(request.params.id);
    const { userId, date, products } = request.body;

    if (!userId || !date || !products) {
      throw errorResponder(errorTypes.EMPTY_BODY, 'All fields are required');
    }

    const success = await cartsService.editCart(cartId, userId, date, products);

    if (!success) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to update cart');
    }

    return response.status(200).json({ message: 'Cart updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteCart(request, response, next) {
  try {
    const cartId = request.params.id;

    const cart = await cartsService.getSingleCart(cartId);
    if (!cart) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Cart not found');
    }

    const success = await cartsService.deleteCart(cartId);

    if (!success) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to delete cart');
    }

    return response.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllCarts,
  getCartsByUserId,
  getSingleCart,
  addCart,
  editCart,
  deleteCart,
};
