import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from "cors";
import { courses, modules, users, enrollments, assignments } from "./Kanbas/Database/index.js";

const app = express();
app.use(cors()); // CORS middleware
app.use(express.json()); // Parse JSON request bodies

// Kanbas routes
app.get("/courses", (req, res) => res.json(courses));
app.get("/modules", (req, res) => res.json(modules));
app.get("/users", (req, res) => res.json(users));
app.get("/enrollments", (req, res) => res.json(enrollments));
app.get("/assignments", (req, res) => res.json(assignments));

Lab5(app);  // Pass the app instance to Lab5
Hello(app); // Pass the app instance to Hello

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
