import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/assignments", (req, res) => {
    const assignments = assignmentsDao.findAllAssignments();
    res.json(assignments);
  });

  app.post("/api/assignments", (req, res) => {
    const newAssignment = assignmentsDao.createAssignment(req.body);
    res.status(201).json(newAssignment);
  });

  app.put("/api/assignments/:id", (req, res) => {
    const updatedAssignment = assignmentsDao.updateAssignment(req.params.id, req.body);
    if (!updatedAssignment) return res.status(404).json({ error: "Assignment not found" });
    res.json(updatedAssignment);
  });

  app.delete("/api/assignments/:id", (req, res) => {
    const success = assignmentsDao.deleteAssignment(req.params.id);
    if (!success) return res.status(404).json({ error: "Assignment not found" });
    res.sendStatus(204);
  });
}
