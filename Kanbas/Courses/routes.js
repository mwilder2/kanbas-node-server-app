import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";;

// Define API base paths
const API_BASE = "/api";
const COURSES_API = `${API_BASE}/courses`;

export default function CourseRoutes(app) {
  app.get(COURSES_API, (req, res) => {
    const courses = dao.findAllCourses();
    res.json(courses);
  });

  app.get(`${COURSES_API}/:id`, (req, res) => {
    const course = dao.findCourseById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  });

  app.post(COURSES_API, (req, res) => {
    const newCourse = dao.createCourse(req.body);
    res.status(201).json(newCourse);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const updatedCourse = dao.updateCourse(courseId, courseUpdates);
    res.json(updatedCourse); // Respond with the updated course
  });

  app.delete(`${COURSES_API}/:id`, (req, res) => {
    const success = dao.deleteCourse(req.params.id);
    if (!success) return res.status(404).json({ error: "Course not found" });
    res.sendStatus(204);
  });

  app.get(`${COURSES_API}/:courseId/modules`, (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);

    if (!modules || modules.length === 0) {
      return res.status(404).json({ error: "Modules not found for the given course ID" });
    }

    res.json(modules);
  });

  // Add a new module for a course
  app.post(`${COURSES_API}/:courseId/modules`, (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.status(201).json(newModule); // Respond with the new module
  });
}