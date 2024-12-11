import UserModel from "./model.js";

export const createUser = (user) => UserModel.create(user);
export const findAllUsers = () => UserModel.find();
export const findUserById = (userId) => UserModel.findById(userId);
export const findUserByUsername = (username) => UserModel.findOne({ username });
export const findUserByCredentials = (username, password) =>
  UserModel.findOne({ username, password });
export const updateUser = (userId, user) => UserModel.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => UserModel.deleteOne({ _id: userId });

export const findUsersByRole = (role) => UserModel.find({ role });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};