const User = require('../../../models/user'); 
const { ObjectId } = require('mongoose').Types;

async function getUsers(limit = 0, sort = 1) {
  const users = await User.find()
    .select('-_id') 
    .limit(limit)
    .sort({ id: sort });
  return users;
}

async function getUser(id) {
  const user = await User.findOne({ id: parseInt(id) }).select('-_id');
  return user;
}

async function emailExists(email) {
  const user = await User.findOne({ email });
  return !!user;
}

async function createUser(data) {
  const userCount = await User.countDocuments();
  const newUser = new User({
    id: userCount + 1,
    email: data.email,
    username: data.username,
    password: data.password,
    name: {
      firstname: data.name.firstname,
      lastname: data.name.lastname,
    },
    address: {
      city: data.address.city,
      street: data.address.street,
      number: data.address.number,
      zipcode: data.address.zipcode,
      geolocation: {
        lat: data.address.geolocation.lat,
        long: data.address.geolocation.long,
      },
    },
    phone: data.phone,
  });

  await newUser.save();
  return true;
}

async function updateUser(id, data) {
  const result = await User.updateOne(
    { id: parseInt(id) },
    {
      $set: {
        email: data.email,
        username: data.username,
        name: {
          firstname: data.name.firstname,
          lastname: data.name.lastname,
        },
        address: {
          city: data.address.city,
          street: data.address.street,
          number: data.address.number,
          zipcode: data.address.zipcode,
          geolocation: {
            lat: data.address.geolocation.lat,
            long: data.address.geolocation.long,
          },
        },
        phone: data.phone,
      },
    }
  );

  return result.modifiedCount > 0;
}

async function deleteUser(id) {
  const result = await User.deleteOne({ id: parseInt(id) });
  return result.deletedCount > 0;
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
};
