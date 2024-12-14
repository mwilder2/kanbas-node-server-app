import * as dao from "./dao.js";

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

  app.put(`${COURSES_API}/:id`, (req, res) => {
    const updatedCourse = dao.updateCourse(req.params.id, req.body);
    if (!updatedCourse) return res.status(404).json({ error: "Course not found" });
    res.json(updatedCourse);
  });

  app.delete(`${COURSES_API}/:id`, (req, res) => {
    const success = dao.deleteCourse(req.params.id);
    if (!success) return res.status(404).json({ error: "Course not found" });
    res.sendStatus(204);
  });
}


// import * as dao from "./dao.js";

// export default function CourseRoutes(app) {
//   app.get("/api/courses", (req, res) => {
//     const courses = dao.findAllCourses();
//     res.json(courses);
//   });

//   app.get("/api/courses/:id", (req, res) => {
//     const course = dao.findCourseById(req.params.id);
//     if (!course) return res.status(404).json({ error: "Course not found" });
//     res.json(course);
//   });

//   app.post("/api/courses", (req, res) => {
//     const newCourse = dao.createCourse(req.body);
//     res.status(201).json(newCourse);
//   });

//   app.put("/api/courses/:id", (req, res) => {
//     const updatedCourse = dao.updateCourse(req.params.id, req.body);
//     if (!updatedCourse) return res.status(404).json({ error: "Course not found" });
//     res.json(updatedCourse);
//   });

//   app.delete("/api/courses/:id", (req, res) => {
//     const success = dao.deleteCourse(req.params.id);
//     if (!success) return res.status(404).json({ error: "Course not found" });
//     res.sendStatus(204);
//   });
// }
