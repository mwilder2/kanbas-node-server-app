import courses from "../Database/courses.js";

export const findAllCourses = () => courses;

export const findCourseById = (id) => courses.find((course) => course._id === id);

export const createCourse = (newCourse) => {
  const course = { ...newCourse, _id: Date.now().toString() };
  courses.push(course);
  return course;
};

export const updateCourse = (id, updatedCourse) => {
  const index = courses.findIndex((course) => course._id === id);
  if (index === -1) return null;
  courses[index] = { ...courses[index], ...updatedCourse };
  return courses[index];
};

export const deleteCourse = (id) => {
  const index = courses.findIndex((course) => course._id === id);
  if (index === -1) return false;
  courses.splice(index, 1);
  return true;
};
