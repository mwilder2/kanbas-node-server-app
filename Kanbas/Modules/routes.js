import * as dao from "./dao.js";

export default function ModulesRoutes(app) {
  app.get("/api/modules", (req, res) => {
    const modules = dao.findAllModules();
    console.log(modules);
    res.json(modules);
  });

  app.get("/api/modules/course/:courseId", (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    if (!modules || modules.length === 0) {
      return res.status(404).json({ error: "Modules not found for the given course ID" });
    }
    res.json(modules);
  });

  app.get("/api/modules/:id", (req, res) => {
    const module = dao.findModuleById(req.params.id);
    if (!module) return res.status(404).json({ error: "Module not found" });
    res.json(module);
  });

  app.post("/api/modules", (req, res) => {
    const newModule = dao.createModule(req.body);
    res.status(201).json(newModule);
  });

  app.put("/api/modules/:id", (req, res) => {
    const updatedModule = dao.updateModule(req.params.id, req.body);
    if (!updatedModule) return res.status(404).json({ error: "Module not found" });
    res.json(updatedModule);
  });

  app.delete("/api/modules/:id", (req, res) => {
    const success = dao.deleteModule(req.params.id);
    if (!success) return res.status(404).json({ error: "Module not found" });
    res.sendStatus(204);
  });
}