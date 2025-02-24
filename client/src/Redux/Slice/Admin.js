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
export const updateProject = createAsyncThunk("/update/project", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const DeleteProject = createAsyncThunk("/delete/project", async () => {
  try {
    const response = await axiosInstance.get("/");
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
  "/delete/skillCart",
  async (data) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/skill/${data.cartId}/${data.skillId}`
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
export const DeleteEductionCart = createAsyncThunk(
  "/delete/SkillInEducationCart",
  async () => {
    try {
      const response = await axiosInstance.get("/");
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
    const response = await axiosInstance.get("/app/admin/v3/Message");
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const GetAllFeedback = createAsyncThunk("/get/feedback", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const getPassword = createAsyncThunk("/get/password", async () => {
  try {
    const response = await axiosInstance.get("/");
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
      })
      .addCase(getPassword.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          localStorage.setItem("password", action?.payload?.data?.password);
          state.password = action?.payload?.data?.password;
        }
      });
  },
});
export const {} = AdminRedux.actions;
export default AdminRedux.reducer;
