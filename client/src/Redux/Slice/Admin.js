import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";
const initialState = {
  Message:
    localStorage.getItem("Message") == undefined
      ? JSON.parse(localStorage.getItem("Message"))
      : {},
  Feedback:
    localStorage.getItem("Feedback") == undefined
      ? JSON.parse(localStorage.getItem("Feedback"))
      : {},
  password: localStorage.getItem("password") || null,
};
export const updateBanner = createAsyncThunk("/update/banner", async (data) => {
  try {
    const response = await axiosInstance.put("/app/admin/v3/mainSection", data);
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const updateSocialLink = createAsyncThunk("/update/banner", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const AboutUpdate = createAsyncThunk("/update/About", async (data) => {
  try {
    const response = await axiosInstance.put("/app/admin/v3/About", data);
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const updateProject = createAsyncThunk(
  "/update/project",
  async (data) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/project/${data._id}`,
        data
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const updateEducation = createAsyncThunk(
  "/update/Education",
  async ({ id, data }) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/education/${id}`,
        data
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const UploadEducationCart = createAsyncThunk(
  "/upload/education",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        `/app/admin/v3/education/`,
        data
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const UploadProject = createAsyncThunk(
  "/upload/project",
  async (data) => {
    try {
      const response = await axiosInstance.post(`/app/admin/v3/project/`, data);
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const DeleteEducation = createAsyncThunk(
  "/delete/education",
  async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/app/admin/v3/education/${id}`
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const DeleteProject = createAsyncThunk("/delete/project", async (id) => {
  try {
    const response = await axiosInstance.delete(`/app/admin/v3/project/${id}`);
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const NewUploadProject = createAsyncThunk("/new/project", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const SkillAddCart = createAsyncThunk("/new/skill", async (data) => {
  try {
    const response = await axiosInstance.post("/app/admin/v3/skill/", data);
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const AddSkillInCart = createAsyncThunk(
  "/new/skill/skill",
  async (data) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/skill/${data.id}`,
        data
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const editSkillCartTitle = createAsyncThunk(
  "/update/SkillCart",
  async (data) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/skill/updateTitle/${data.id}`,
        data
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const DeleteSkillInCart = createAsyncThunk(
  "/delete/skillInCart",
  async ({ cartId, skillId }) => {
    console.log(cartId, skillId);
    try {
      const response = await axiosInstance.delete(
        `/app/admin/v3/skill/${cartId}/${skillId}`
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const UpdateSkillInCart = createAsyncThunk(
  "/update/skillInCart",
  async (data) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/skill/${data.cartId}/${data.skillId}`,
        data
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const DeleteCart = createAsyncThunk(
  "/delete/SkillInEducationCart",
  async (data) => {
    try {
      const response = await axiosInstance.delete(
        `/app/admin/v3/skill/${data}`
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const GetAllMessage = createAsyncThunk("/get/message", async () => {
  try {
    const response = await axiosInstance.get("/app/user/v3/Message");
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const updateSocialData = createAsyncThunk(
  "/put/SocialData",
  async (data) => {
    try {
      const response = await axiosInstance.put("/app/admin/v3/social", data);
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const messageMarkAsRead = createAsyncThunk(
  "/put/message",
  async (id) => {
    try {
      const response = await axiosInstance.put(`/app/user/v3/Message/${id}`);
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const GetAllFeedback = createAsyncThunk("/get/feedback", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const AdminLogin = createAsyncThunk(
  "/LoginAs/admin",
  async ({ email, password }) => {
    try {
      const response = await axiosInstance.get(
        `/app/admin/v3/Login/${email}/${password}`
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const checkPasswordReset = createAsyncThunk(
  "/check/Token",
  async (resetToken) => {
    try {
      const response = await axiosInstance.get(
        `/app/admin/v3/checkPasswordReset/${resetToken}`
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const changePassword = createAsyncThunk(
  "/put/admin/password",
  async ({ resetToken, newPassword }) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/change/Password/${resetToken}`,

        {
          newPassword: newPassword,
        }
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const UpdatePassword = createAsyncThunk(
  "/put/admin/password",
  async (data) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/update/password/`,
        data
      );
      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const subscribers = createAsyncThunk("/put/admin/password", async () => {
  try {
    const response = await axiosInstance.get(`/app/admin/v3/subscribe/`);
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});

const AdminRedux = createSlice({
  name: "AdminStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllMessage.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          localStorage.setItem("Message", action?.payload?.data?.message);
          state.Message = action?.payload?.data?.message;
        }
      })
      .addCase(GetAllFeedback.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          localStorage.setItem("feedback", action?.payload?.data?.feedback);
          state.Feedback = action?.payload?.data?.Feedback;
        }
      });
  },
});
export const {} = AdminRedux.actions;
export default AdminRedux.reducer;
