import assignments from "./Database/assignments.js";

export default function Kanbas(app) {
  // Get all assignments
  app.get("/kanbas/assignments", (req, res) => {
    res.json(assignments);
  });

  // Add a new assignment
  app.post("/kanbas/assignments", (req, res) => {
    const newAssignment = { ...req.body, _id: new Date().getTime().toString() };
    assignments.push(newAssignment);
    res.status(201).json(newAssignment);
  });

  // Delete an assignment by ID
  app.delete("/kanbas/assignments/:id", (req, res) => {
    const { id } = req.params;
    const index = assignments.findIndex((a) => a._id === id);
    if (index !== -1) {
      assignments.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: `Assignment with ID ${id} not found` });
    }
  });

  // Update an assignment by ID
  app.put("/kanbas/assignments/:id", (req, res) => {
    const { id } = req.params;
    const index = assignments.findIndex((a) => a._id === id);
    if (index !== -1) {
      assignments[index] = { ...assignments[index], ...req.body };
      res.status(200).json(assignments[index]);
    } else {
      res.status(404).json({ message: `Assignment with ID ${id} not found` });
    }
  });
}
