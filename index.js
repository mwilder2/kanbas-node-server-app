import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModulesRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";

dotenv.config();

const app = express();
app.use(cors()); // CORS middleware
app.use(express.json()); // Parse JSON request bodies

// Attach routes
UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the server at: ${process.env.SERVER_URL || `http://localhost:${PORT}`}`);
});