import * as enrollmentsDao from "./dao.js";

// Define API base paths
const API_BASE = "/api";
const ENROLLMENTS_API = `${API_BASE}/enrollments`;

export default function EnrollmentRoutes(app) {
  app.get(ENROLLMENTS_API, (req, res) => {
    const enrollments = enrollmentsDao.findAllEnrollments();
    res.json(enrollments);
  });

  app.post(ENROLLMENTS_API, (req, res) => {
    const { userId, courseId } = req.body;
    const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.status(201).json(newEnrollment);
  });

  app.delete(`${ENROLLMENTS_API}/:userId/:courseId`, (req, res) => {
    const { userId, courseId } = req.params;
    const success = enrollmentsDao.unenrollUserInCourse(userId, courseId);
    if (!success) return res.status(404).json({ error: "Enrollment not found" });
    res.sendStatus(204);
  });
}



// import * as enrollmentsDao from "./dao.js";

// export default function EnrollmentRoutes(app) {
//   app.get("/api/enrollments", (req, res) => {
//     const enrollments = enrollmentsDao.findAllEnrollments();
//     res.json(enrollments);
//   });

//   app.post("/api/enrollments", (req, res) => {
//     const { userId, courseId } = req.body;
//     const newEnrollment = enrollmentsDao.enrollUser(userId, courseId);
//     res.status(201).json(newEnrollment);
//   });

//   app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
//     const { userId, courseId } = req.params;
//     const success = enrollmentsDao.unenrollUser(userId, courseId);
//     if (!success) return res.status(404).json({ error: "Enrollment not found" });
//     res.sendStatus(204);
//   });
// }
