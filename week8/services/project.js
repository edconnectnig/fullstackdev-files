// imports
const fs = require("fs");
const path = require("path");
const users = require("../models/users");
const Projects = require("../models/projects").Projects;

// load data file
const projectsFile = path.join(__dirname, "../projects.json");

// helper functions
const getFileAsJson = (file) => JSON.parse(fs.readFileSync(file));
const saveProjectsToFile = (data) => saveJsonFile(projectsFile, data);
const id = () => Math.random().toString(36).substring(2);

// populate projects with data from file.
const projects = new Projects();
projects.data = getFileAsJson(projectsFile).data;

/* Create new project */
const create = ({ name, abstract, authors, tags }) => {
  const project = new Project(
    id(),
    name,
    abstract,
    authors,
    tags,
    req.session.uid
  );
  if (projects.save(project)) {
    saveProjectsToFile(projects.data);
    return [true, project];
  } else {
    return [false, projects.errors];
  }
};

/* Return project with specified id */
const getById = (id) => {
  return users.getById(id);
};
/* Return all projects */
const getAll = () => {
  return projects.getAll();
};

module.exports = {
  getAll,
  create,
  getById
};
