import assignments from "../Database/assignments.js";

export function findAllAssignments() {
  return assignments;
}

export function findAssignmentsForCourse(courseId) {
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  assignments = [...assignments, newAssignment];
  return newAssignment;
}

export function updateAssignment(id, updatedAssignment) {
  const index = assignments.findIndex((assignment) => assignment._id === id);
  if (index === -1) return null;
  assignments[index] = { ...assignments[index], ...updatedAssignment };
  return assignments[index];
}

export function deleteAssignment(id) {
  const index = assignments.findIndex((assignment) => assignment._id === id);
  if (index === -1) return false;
  assignments.splice(index, 1);
  return true;
}