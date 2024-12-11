import modules from "../Database/modules.js";
import model from "./model.js";


// Find all modules
export const findAllModules = () => modules;

// Find a module by ID
export const findModuleById = (id) => {
  return modules.find((module) => module._id === id);
};

export function findModulesForCourse(courseId) {
  return model.find({ course: courseId }); // Retrieve modules by course ID
}

// Create a new module
export function createModule(module) {
  delete module._id; // Remove _id to let MongoDB generate it
  return model.create(module);
}
// Update a module by ID
export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId }, { $set: moduleUpdates }); // Use $set for partial updates
}

// Delete a module
export const deleteModule = (id) => {
  const index = modules.findIndex((module) => module._id === id);
  if (index === -1) return false;

  modules.splice(index, 1);
  return true;
};
