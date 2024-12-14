import express from "express";
import cors from "cors";
import "dotenv/config"; // Import dotenv
import session from "express-session"; // Import express-session
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModulesRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import Lab5 from "./Lab5/index.js";

const app = express();

// CORS setup for allowing cookies
app.use(
  cors({
    credentials: true, // Allow cookies
    origin: process.env.NETLIFY_URL || "http://localhost:3000", // Allow your frontend URL
  })
);

// JSON parsing middleware
app.use(express.json());

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas", // Secret for encrypting session data
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true; // Needed for secure cookies in production
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true, // Secure cookie for HTTPS
    domain: process.env.NODE_SERVER_DOMAIN, // Your backend's domain
  };
}

app.use(session(sessionOptions)); // Add session middleware

// Example route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Attach routes
UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Lab5(app);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import UserRoutes from "./Kanbas/Users/routes.js";
// import CourseRoutes from "./Kanbas/Courses/routes.js";
// import ModulesRoutes from "./Kanbas/Modules/routes.js";
// import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
// import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
// import Lab5 from "./Lab5/index.js";

// dotenv.config();

// const app = express();
// app.use(cors()); // CORS middleware
// app.use(express.json()); // Parse JSON request bodies

// // Attach routes
// UserRoutes(app);
// CourseRoutes(app);
// ModulesRoutes(app);
// AssignmentRoutes(app);
// EnrollmentRoutes(app);
// Lab5(app);

// // get hello
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const PORT = 4000;
// app.listen(PORT, () => {
//   // const PORT = process.env.PORT || 4000;
//   console.log(`Server is running on port ${PORT}`);
//   // console.log(`Access the server at: ${process.env.SERVER_URL || `http://localhost:${PORT}`}`);
// });

