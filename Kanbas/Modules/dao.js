import modules from "../Database/modules.js";

// Find all modules
export const findAllModules = () => modules;

// Find a module by ID
export const findModuleById = (id) => {
  return modules.find((module) => module._id === id);
};

export function findModulesForCourse(courseId) {
  return modules.filter((module) => module.course === courseId);
}

// Create a new module
export const createModule = (newModule) => {
  const module = { ...newModule, _id: Date.now().toString() };
  modules.push(module);
  return module;
};

// Update a module
export const updateModule = (id, updatedModule) => {
  const index = modules.findIndex((module) => module._id === id);
  if (index === -1) return null;

  modules[index] = { ...modules[index], ...updatedModule };
  return modules[index];
};

// Delete a module
export const deleteModule = (id) => {
  const index = modules.findIndex((module) => module._id === id);
  if (index === -1) return false;

  modules.splice(index, 1);
  return true;
};
