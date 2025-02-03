import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const { API } = require("./createApi");

export const addProject = async (data) => {
  console.log(data, "data");
  try {
    const project = await API.post("/api/addProject", data);
    if (project) {
      console.log("done Create Project", project.data);
      toast.success(project.data.message);
      return project.data.message;
    }
    return;
  } catch (error) {
    console.log(error?.response?.data.error);
    toast.error(error?.response?.data.error);
    return false;
  }
};

export const getProjects = async (page) => {
  try {
    const data = await API.get(`/api/get-projects?page=${page}`);
    // toast.success(data.data.message);
    const projects = data.data.projects;
    const pages = data.data.pages;
    return { projects, pages };
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return;
  }
};

export const deleteProject = async (id) => {
  try {
    const data = await API.delete(`/api/delete-project/${id}`);
    if (data) console.log(data.data.message);
    location.reload();
    toast.success(data.data.message);

    return;
  } catch (error) {
    toast.error(error.response.data.error);
    return;
  }
};

export const getProject = async (id) => {
  try {
    const data = await API.get(`/api/get-project/${id}`);
    if (data) {
      return data.data.project;
    }
    return;
  } catch (error) {
    toast.error(error.response.data.error, "Erorroror");
    return;
  }
};

export const updateProject = async (id, form) => {
  try {
    console.log(id, form, "data");

    const data = await API.put(`/api/updateProject/${id}`, form);
    console.log(data.data.project, "Done update Project");

    toast.success("Done Update Project Successfully");
    return data.data.project;
  } catch (error) {
    toast.error(error.response.data.error);
    return false;
  }
};

export const deleteImage = async (id, image) => {
  try {
    console.log(id, image);

    const data = await API.put(`/api/deleteImage/${id}`, { image });
    console.log(data.data.message, data.data.project);
    if (data) {
      toast.success(data.data.message);
      return data.data.message;
    }
    return;
  } catch (error) {
    toast.error(error.response.data.error);
    return;
  }
};

export const sortedProjects = async (sortedData) => {
  if (sortedData && sortedData.length > 0) {
    try {
      console.log(sortedData, "sortdDate Before gone");
      const Data = {
        order: sortedData?.map((item, index) => ({
          _id: item._id,
          order: index,
        })),
      };
      const data = await API.put("/api/sortedProjects", Data);
      if (data) {
        toast.success(data.data.message);
        return data.data.message;
      }
      return;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      return;
    }
  }
  return;
};

export const getCategories = async () => {
  try {
    const data = await API.get("/api/get-categories");
    if (data) return data.data.categories;
    return;
  } catch (error) {
    toast.error(error.response.data.error, "Erorroror");
    return;
  }
};

export const addCategory = async (name) => {
  try {
    const data = await API.post("/api/addCategory", { name });
    if (data) {
      toast.success(data.data.message);
      return data.data.category;
    }
    return;
  } catch (error) {
    alert(error.response.data.error, "Erorroror");
    return;
  }
};

export const updateCategory = async ({ id, name }) => {
  try {
    const data = await API.put(`/api/updateCategory/${id}`, { name });
    if (data) {
      toast.success(data.data.message);
      return data.data.category;
    }
    return;
  } catch (error) {
    alert(error.response.data.error, "Erorroror");
    return;
  }
};

export const delelteCategory = async ({ id }) => {
  try {
    const data = await API.delete(`/api/deleteCategory/${id}`);
    if (data) {
      toast.success(data.data.message);
      location.reload();
      return data.data.message;
    }
    return;
  } catch (error) {
    alert(error.response.data.error, "Erorroror");
    return;
  }
};

export async function uploadImageToCloudinary(base64Image) {
  const formData = new FormData();
  formData.append("file", base64Image); // نمرر الصورة بصيغة Base64 مباشرة
  formData.append("upload_preset", "ml_default"); // استبدل 'your_upload_preset' بالـ Upload Preset الخاص بك

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dk9wy7nq2/image/upload", // استبدل 'your_cloud_name' باسم حسابك في Cloudinary
      formData,
      {
        withCredentials: false, // تأكد من تعيين هذا إلى false
      }
    );
    return response.data.secure_url; // عنوان URL للملف المرفوع
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export const addUser = async (data) => {
  try {
    const user = await API.post("/api/create-user", data);
    if (user) {
      toast.success(user.data.message);
      return user.data.user;
    }
    return;
  } catch (error) {
    toast.error(error.response.data.message);
    return;
  }
};

export const getUsers = async () => {
  try {
    const users = await API.get("/api/get-users");
    if (users) {
      return users.data.users;
    }
    return;
  } catch (error) {
    toast.error(error.response.data.message);
    return;
  }
};

export const deleteUser = async (id) => {
  try {
    const users = await API.delete(`/api/delete-user/${id}`);
    if (users) {
      toast.success(users.data.message);
      location.reload();
      return;
    }
    return;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return;
  }
};

export const updateUser = async (data) => {
  try {
    const users = await API.put(`/api/update-user/${data.id}`, data.data);
    if (users) {
      toast.success(users.data.message);
      location.reload();
      return;
    }
    return;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return;
  }
};
