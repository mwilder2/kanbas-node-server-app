import * as dao from "./dao.js";

let currentUser = null; // Tracks logged-in user
const USERS_API = "/api/users";
const KANBAS_API = "/kanbas";

export default function UserRoutes(app) {

  app.post(`${USERS_API}/action/signout`, (req, res) => {
    req.session.destroy(); // Destroy session
    res.sendStatus(200); // Send success status
  });

  // Sign-in route
  app.post(`${USERS_API}/signin`, (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user; // Store user in session
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });


  // Sign-up route
  app.post(`${USERS_API}/signup`, (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const newUser = dao.createUser(req.body);
    req.session["currentUser"] = newUser; // Store user in session
    res.json(newUser);
  });

  app.get(`${USERS_API}`, (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  });

  app.get(`${USERS_API}/:id`, (req, res) => {
    const user = dao.findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User with the provided ID not found." });
    }
    res.json(user);
  });

  app.post(`${USERS_API}`, (req, res) => {
    const newUser = dao.createUser(req.body);
    res.status(201).json(newUser);
  });

  app.put(`${USERS_API}/:id`, (req, res) => {
    const userId = req.params.id;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates); // Update user in DAO
    const updatedUser = dao.findUserById(userId); // Retrieve updated user
    req.session["currentUser"] = updatedUser; // Sync session with updated user
    res.json(updatedUser);
  });

  // app.put(`${USERS_API}/:id`, (req, res) => {
  //   const updatedUser = dao.updateUser(req.params.id, req.body);
  //   if (!updatedUser) {
  //     return res.status(404).json({ error: "User with the provided ID not found." });
  //   }

  //   currentUser = updatedUser;
  //   res.json(updatedUser);
  // });

  app.delete(`${USERS_API}/:id`, (req, res) => {
    const deleted = dao.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "User with the provided ID not found." });
    }
    res.sendStatus(204);
  });

  app.get(`${KANBAS_API}/profile`, (req, res) => {
    const currentUser = req.session["currentUser"]; // Get user from session
    if (!currentUser) {
      res.status(401).json({ message: "No user is logged in" });
      return;
    }
    res.json(currentUser);
  });
}