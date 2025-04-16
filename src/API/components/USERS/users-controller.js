const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword } = require('../../../src/UTILS/password');

async function getUsers(req, res, next) {
  try {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;

    const users = await usersService.getUsers(limit, sort);

    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await usersService.getUser(req.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const {
      email,
      username,
      password,
      confirm_password: confirmPassword,
      firstname,
      lastname,
      address,
      phone,
    } = req.body;

    if (!email || !username || !password || !firstname || !lastname || !address || !phone) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Missing required fields');
    }

    if (await usersService.emailExists(email)) {
      throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'Email already exists');
    }

    if (password.length < 8) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password must be at least 8 characters long');
    }

    if (password !== confirmPassword) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password and confirm password do not match');
    }

    const hashedPassword = await hashPassword(password);

    const success = await usersService.createUser({
      email,
      username,
      password: hashedPassword,
      name: { firstname, lastname },
      address,
      phone,
    });

    if (!success) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to create user');
    }

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = req.params.id;
    const {
      email,
      username,
      firstname,
      lastname,
      address,
      phone,
    } = req.body;

    const user = await usersService.getUser(id);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    if (!email || !username || !firstname || !lastname || !address || !phone) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Missing required fields');
    }

    if (email !== user.email && (await usersService.emailExists(email))) {
      throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'Email already exists');
    }

    const success = await usersService.updateUser(id, {
      email,
      username,
      name: { firstname, lastname },
      address,
      phone,
    });

    if (!success) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to update user');
    }

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const success = await usersService.deleteUser(req.params.id);

    if (!success) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to delete user');
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
