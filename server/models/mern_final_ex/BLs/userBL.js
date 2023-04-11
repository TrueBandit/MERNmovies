const User = require('../data_models/userModel');

const getAllUsers = async () => {
  let resp = await User.find({})
    return resp;
};
const findUserAndAuth = async (user) => {
  let resp = await User.findOne({username : user.username})
  if (resp) {
    if (resp.password == user.password) {
      return resp
    }}
  
  return null;
};

module.exports = {
    getAllUsers, findUserAndAuth
  };