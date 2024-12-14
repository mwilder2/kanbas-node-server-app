import * as dao from "./dao.js";

// Define API base paths
const API_BASE = "/api";
const MODULES_API = `${API_BASE}/modules`;

export default function ModulesRoutes(app) {

  app.delete(`${MODULES_API}/:id`, (req, res) => {
    console.log(req.params.id);
    const success = dao.deleteModule(req.params.id);
    if (!success) return res.status(404).json({ error: "Module not found" });
    res.sendStatus(204);
  });

  app.get(MODULES_API, (req, res) => {
    const modules = dao.findAllModules();
    console.log(modules);
    res.json(modules);
  });

  app.get(`${MODULES_API}/course/:courseId`, (req, res) => {
    const { courseId } = req.params;
    // console.log(courseId);
    const modules = dao.findModulesForCourse(courseId);
    // console.log(JSON.stringify(modules, null, 2)); // Pretty-print the modules
    if (!modules || modules.length === 0) {
      return res.status(404).json({ error: "Modules not found for the given course ID" });
    }
    res.json(modules);
  });

  app.get(`${MODULES_API}/:id`, (req, res) => {
    const module = dao.findModuleById(req.params.id);
    if (!module) return res.status(404).json({ error: "Module not found" });
    res.json(module);
  });

  app.post(MODULES_API, (req, res) => {
    const newModule = dao.createModule(req.body);
    res.status(201).json(newModule);
  });

  app.put(`${MODULES_API}/:moduleId`, (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const updatedModule = dao.updateModule(moduleId, moduleUpdates);
    if (!updatedModule) {
      return res.status(404).json({ error: "Module not found" });
    }
    res.status(200).json(updatedModule); // Return the updated module
  });

  // app.put(`${MODULES_API}/:id`, (req, res) => {
  //   const updatedModule = dao.updateModule(req.params.id, req.body);
  //   if (!updatedModule) return res.status(404).json({ error: "Module not found" });
  //   res.json(updatedModule);
  // });

  // app.delete("/api/modules/:moduleId", async (req, res) => {
  //   const { moduleId } = req.params;
  //   modulesDao.deleteModule(moduleId); // Remove module using DAO
  //   res.sendStatus(204); // Respond with no content
  // });
}