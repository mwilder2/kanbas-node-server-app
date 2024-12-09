import users from "../Database/users.js";

export const findAllUsers = () => users;

export const findUserById = (userId) =>
  users.find((user) => user._id === userId);

export const findUserByUsername = (username) => {
  return users.find((user) => user.username === username);
};

export const createUser = (user) => {
  const newUser = { ...user, _id: Date.now().toString() };
  users.push(newUser);
  return newUser;
};

export const updateUser = (userId, user) => {
  const index = users.findIndex((u) => u._id === userId);
  if (index === -1) return null;
  users[index] = { ...users[index], ...user };
  return users[index];
};

export const deleteUser = (userId) => {
  const index = users.findIndex((user) => user._id === userId);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};

export const findUserByCredentials = (username, password) =>
  users.find((user) => user.username === username && user.password === password);