import users from "./Database/users.js";

export default function Kanbas(app) {
  app.post("/kanbas/signin", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  });
}
