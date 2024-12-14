import "dotenv/config"; // Load environment variables
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModulesRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";

// const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
const CONNECTION_STRING = "mongodb://127.0.0.1:27017/kanbas";

// Connect to MongoDB
mongoose.connect(CONNECTION_STRING);

// mongoose.connect(CONNECTION_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

const app = express();
app.use(cors());
app.use(express.json());

// Attach routes
UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
