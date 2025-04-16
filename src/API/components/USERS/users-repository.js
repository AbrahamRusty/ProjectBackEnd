const User = require('../../../models/user'); 

async function getUsers(limit = 0, sort = 1) {
  return User.find()
    .select('-_id')
    .limit(limit)
    .sort({ id: sort });
}

async function getUser(id) {
  return User.findOne({ id: parseInt(id) }).select('-_id');
}

async function getUserByEmail(email) {
  return User.findOne({ email });
}

async function createUser(userData) {
  const userCount = await User.countDocuments();

  const newUser = new User({
    id: userCount + 1,
    ...userData,
  });

  return newUser.save();
}

async function updateUser(id, updatedFields) {
  return User.updateOne(
    { id: parseInt(id) },
    { $set: updatedFields }
  );
}

async function changePassword(id, hashedPassword) {
  return User.updateOne(
    { id: parseInt(id) },
    { $set: { password: hashedPassword } }
  );
}

async function deleteUser(id) {
  return User.deleteOne({ id: parseInt(id) });
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
