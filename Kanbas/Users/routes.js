import * as userDao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

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
    const user = userDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user; // Store user in session
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });


  // Sign-up route
  app.post(`${USERS_API}/signup`, (req, res) => {
    const user = userDao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const newUser = userDao.createUser(req.body);
    req.session["currentUser"] = newUser; // Store user in session
    res.json(newUser);
  });

  app.get(`${USERS_API}`, (req, res) => {
    const users = userDao.findAllUsers();
    res.json(users);
  });

  app.get(`${USERS_API}/:id`, (req, res) => {
    const user = userDao.findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User with the provided ID not found." });
    }
    res.json(user);
  });

  app.post(`${USERS_API}`, (req, res) => {
    const newUser = userDao.createUser(req.body);
    res.status(201).json(newUser);
  });

  app.put(`${USERS_API}/:id`, (req, res) => {
    const userId = req.params.id;
    const userUpdates = req.body;
    userDao.updateUser(userId, userUpdates); // Update user in DAO
    const updatedUser = userDao.findUserById(userId); // Retrieve updated user
    req.session["currentUser"] = updatedUser; // Sync session with updated user
    res.json(updatedUser);
  });

  app.delete(`${USERS_API}/:id`, (req, res) => {
    const deleted = userDao.deleteUser(req.params.id);
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

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"]; // Retrieve the current user from the session
    if (!currentUser || currentUser.role !== "FACULTY") {
      return res.status(403).json({ message: "Unauthorized" }); // Restrict non-faculty users
    }
    const newCourse = courseDao.createCourse(req.body); // Create a new course
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id); // Enroll the faculty member as the creator
    res.json(newCourse);
  };

  app.post("/api/users/current/courses", createCourse);
}