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
export function updateModule(moduleId, moduleUpdates) {
  const module = modules.find((module) => module._id === moduleId);
  if (!module) {
    return null; // Return null if the module isn't found
  }
  Object.assign(module, moduleUpdates); // Update the module
  return module;
}

// export const updateModule = (id, updatedModule) => {
//   const index = modules.findIndex((module) => module._id === id);
//   if (index === -1) return null;

//   modules[index] = { ...modules[index], ...updatedModule };
//   return modules[index];
// };

// Delete a module
export function deleteModule(moduleId) {

  // Find the index of the module to be deleted
  const moduleIndex = modules.findIndex((module) => module._id === moduleId);

  if (moduleIndex === -1) return false; // Module not found

  // Use splice to remove the module without reassigning the array
  modules.splice(moduleIndex, 1);

  return true; // Successfully deleted
}


// export const deleteModule = (id) => {
//   const index = modules.findIndex((module) => module._id === id);
//   if (index === -1) return false;

//   modules.splice(index, 1);
//   return true;
// };

// export function deleteModule(moduleId) {
//   const { modules } = Database;
//   Database.modules = modules.filter((module) => module._id !== moduleId);
// }