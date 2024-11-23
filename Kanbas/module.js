import modules from "./Database/modules.js";

app.get("/kanbas/modules", (req, res) => {
  res.json(modules); // Return all modules
});

app.post("/kanbas/modules", (req, res) => {
  const newModule = { ...req.body, _id: new Date().getTime().toString() };
  modules.push(newModule);
  res.json(newModule);
});

app.delete("/kanbas/modules/:id", (req, res) => {
  const { id } = req.params;
  const moduleIndex = modules.findIndex((m) => m._id === id);
  if (moduleIndex === -1) {
    res.status(404).json({ message: `Module with ID ${id} not found` });
    return;
  }
  modules.splice(moduleIndex, 1);
  res.sendStatus(200);
});

app.put("/kanbas/modules/:id", (req, res) => {
  const { id } = req.params;
  const moduleIndex = modules.findIndex((m) => m._id === id);
  if (moduleIndex === -1) {
    res.status(404).json({ message: `Module with ID ${id} not found` });
    return;
  }
  modules[moduleIndex] = { ...modules[moduleIndex], ...req.body };
  res.sendStatus(200);
});
