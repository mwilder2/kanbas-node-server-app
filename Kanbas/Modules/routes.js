import * as dao from "./dao.js";

export default function ModulesRoutes(app) {
  app.get("/api/modules", (req, res) => {
    const modules = dao.findAllModules();
    console.log(modules);
    res.json(modules);
  });

  app.get("/api/modules/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.get("/api/modules/:id", (req, res) => {
    const module = dao.findModuleById(req.params.id);
    if (!module) return res.status(404).json({ error: "Module not found" });
    res.json(module);
  });

  app.post("/api/modules/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId, // Associate the module with the course
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params; // Extract module ID from path parameters
    const moduleUpdates = req.body; // Extract updates from request body
    const status = await modulesDao.updateModule(moduleId, moduleUpdates); // Update module in database
    res.send(status); // Send the update status back to the client
  });

  app.delete("/api/modules/:id", (req, res) => {
    const success = dao.deleteModule(req.params.id);
    if (!success) return res.status(404).json({ error: "Module not found" });
    res.sendStatus(204);
  });
}