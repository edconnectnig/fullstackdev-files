// wrap calls to API.
const Api = {
  async _api(url, data) {
    return await fetch(`/api/${url}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...data,
    }).then(async (resp) => {
      if (resp.status !== 200) {
        return Promise.reject(await resp.json());
      } else {
        return resp.json();
      }
    });
  },

  async getUser(id) {
    return this._api(`users/${id}`);
  },

  async getPrograms() {
    return this._api("programs");
  },

  async getGradYear() {
    return this._api("graduationYears");
  },

  async register(data) {
    return this._api("register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async login(data) {
    return this._api("login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async createProject(data) {
    return this._api("projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async getProjects() {
    return this._api("projects");
  },
  async getProject(id) {
    return this._api(`projects/${id}`);
  },
};

const projects = [
  {
    title: "project title 1",
    author: "author 1, author 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    tags: ["#demo"],
  },
  {
    title: "project title 2",
    author: "author 1, author 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    tags: ["#demo"],
  },
  {
    title: "project title 3",
    author: "author 1, author 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    tags: ["#demo"],
  },
  {
    title: "project title 4",
    author: "author 1, author 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    tags: ["#demo"],
  },
];
export default {
  getData() {
    return projects;
  },
  getDataById(id) {
    return projects[id];
  },
  ...Api,
};
