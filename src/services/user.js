// imports
const fs = require("fs");
const path = require("path");
const Users = require("../models/users").Users;
const User = require("../models/users").User;

// load data file
const usersFile = path.join(__dirname, "../users.json");

// helper functions
const saveJsonFile = (file, data) =>
  fs.writeFileSync(file, JSON.stringify({ data }));
const getFileAsJson = (file) => JSON.parse(fs.readFileSync(file));
const saveUsersToFile = (data) => saveJsonFile(usersFile, data);
const id = () => Math.random().toString(36).substring(2);

// populate users with data from file.
const users = new Users();
users.data = getFileAsJson(usersFile).data;

/* Creates new user */
const create = ({
  firstname,
  lastname,
  email,
  password,
  matricNumber,
  program,
  graduationYear,
}) => {
  const user = new User(
    id(),
    firstname,
    lastname,
    email,
    password,
    matricNumber,
    program,
    graduationYear
  );
  if (users.save(user)) {
    saveUsersToFile(users.data);
    return [true, user];
  } else {
    return [false, users.errors];
  }
};

/* Authenticate a user */
const authenticate = (email, password) => {
  if (users.authenticate(email, password)) {
    return [true, users.getByEmail(email)];
  } else {
    return [false, ["Invalid email/password"]];
  }
};

/* Return user with specified id */
const getById = (id) => {
  return users.getById(id);
};

/* Return all users */
const getAll =  () => {
  return new Promise((resolve) => resolve(users.getAll()));
};

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
};