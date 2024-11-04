const { API } = require("./createApi");

export const addProject = async (data) => {
  console.log(data, "data");

  const project = await API.post("/api/addProject", data);
  if (project) {
    console.log("done Create Project", project.data);
  }
};

export const getProjects = async () => {
  const data = await API.get("/api/get-projects");

  if (!data.data) {
    return null;
  }
  return data.data.projects;
};

export const deleteProject = async (id) => {
  if (window.confirm("Are you sure To delete project")) {
    const data = await API.delete(`/api/delete-project/${id}`);
    if (data) console.log(data.data.message);
    location.reload();
  }
};

export const getProject = async (id) => {
  const data = await API.get(`/api/get-project/${id}`);
  if (data) return data.data.project;
};

export const updateProject = async (id, form) => {
  console.log(id, form, "data");

  const data = await API.put(`/api/updateProject/${id}`, form);
  console.log(data.data.project, "Done update Project");

  if (data) return data.data.project;
};

export const deleteImage = async (id, image) => {
  console.log(id, image);

  const data = await API.put(`/api/deleteImage/${id}`, { image });
  console.log(data.data.message, data.data.project);
  if (data) return data.data.message;
};

export const sortedProjects = async (sortedData) => {
  const data = await API.put("/api/sortedProjects", sortedData);
  if (data) {
    console.log(data.data.message);
    return data.data.message;
  }
};

export const getCategories = async () => {
  const data = await API.get("/api/get-categories");
  if (data) return data.data.categories;
};

export const addCategory = async (name) => {
  const data = await API.post("/api/addCategory", { name });
  if (data) {
    console.log(data.data.message);
    return data.data.category;
  }
};

export const updateCategory = async ({ id, name }) => {
  const data = await API.put(`/api/updateCategory/${id}`, { name });
  if (data) {
    console.log(data.data.message);
    return data.data.category;
  }
};

export const delelteCategory = async ({ id }) => {
  const data = await API.delete(`/api/deleteCategory/${id}`);
  if (data) {
    console.log(data.data.message);
    return data.data.message;
  }
};
