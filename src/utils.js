import projects from "./data/projects.json";

export const getImageURL = (path) => {
  return `/assets/${path}`;
};

export function getProjects() {
  return projects;
}
