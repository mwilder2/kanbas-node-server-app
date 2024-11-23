import users from "./Database/users.js";

app.get("/kanbas/users", (req, res) => {
  res.json(users); // `users` is imported from the `Kanbas/Database` folder
});