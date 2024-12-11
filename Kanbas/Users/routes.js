import * as dao from "./dao.js";

let currentUser = null; // Tracks logged-in user

export default function UserRoutes(app) {
  // Async signin route
  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      currentUser = await dao.findUserByCredentials(username, password);

      if (currentUser) {
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Invalid username or password." });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred during signin." });
    }
  };

  // Async signup route
  const signup = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
      }

      const existingUser = await dao.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already in use." });
      }

      const newUser = await dao.createUser({ username, password, role: "USER" });
      currentUser = newUser; // Set the newly created user as the current user
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "An error occurred during signup." });
    }
  };

  // Async profile fetch route
  const getProfile = async (req, res) => {
    if (!currentUser) {
      return res.status(401).json({ message: "No user is currently logged in." });
    }
    res.json(currentUser);
  };

  // Async profile update route
  const updateProfile = async (req, res) => {
    if (!currentUser) {
      return res.status(401).json({ message: "No user is currently logged in." });
    }

    try {
      const updates = req.body;
      currentUser = { ...currentUser, ...updates }; // Update in-memory user data
      await dao.updateUser(currentUser._id, currentUser); // Reflect changes in the database
      res.json(currentUser);
    } catch (error) {
      res.status(500).json({ message: "An error occurred during profile update." });
    }
  };

  // Map routes to functions
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.get("/api/users/profile", getProfile);
  app.put("/api/users/profile", updateProfile);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/users/:uid/courses", findCoursesForUser);

  // Remaining routes
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;

    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }

    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user" });
    }
  };

  app.post("/api/users", async (req, res) => {
    const newUser = await dao.createUser(req.body);
    res.status(201).json(newUser);
  });

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;

    await dao.updateUser(userId, userUpdates);

    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }

    res.json(currentUser);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findCoursesForUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }

    let { uid } = req.params;
    if (uid === "current") {
      uid = currentUser._id;
    }

    const courses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(courses);
  };
}