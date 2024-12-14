import courses from "../Database/courses.js";

export const findAllCourses = () => courses;

export const findCourseById = (id) => courses.find((course) => course._id === id);


export function createCourse(course) {
  const newCourse = { ...course, _id: Date.now().toString() };
  courses.push(newCourse); // Mutate array instead of reassigning
  return newCourse;
}


export function updateCourse(courseId, courseUpdates) {
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
}

export const deleteCourse = (id) => {
  const index = courses.findIndex((course) => course._id === id);
  if (index === -1) return false;
  courses.splice(index, 1);
  return true;
};
