import assignments from "../Database/assignments.js";

export function findAllAssignments() {
  return assignments;
}

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function updateAssignment(id, updatedAssignment) {
  const { assignments } = Database;
  const index = assignments.findIndex((assignment) => assignment._id === id);
  if (index === -1) return null;
  assignments[index] = { ...assignments[index], ...updatedAssignment };
  return assignments[index];
}

export function deleteAssignment(id) {
  const { assignments } = Database;
  const initialLength = assignments.length;
  Database.assignments = assignments.filter((assignment) => assignment._id !== id);
  return Database.assignments.length < initialLength;
}
