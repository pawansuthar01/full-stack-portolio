import { createAsyncThunk } from "@reduxjs/toolkit";
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
};
export const updateBanner = createAsyncThunk("/update/banner", async () => {
  try {
    const response = await axiosInstance.put("/", data);
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
export const AboutUpdate = createAsyncThunk("/update/About", async () => {
  try {
    const response = await axiosInstance.get("/");
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
export const eductionAdd = createAsyncThunk("/new/eduction", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const editEductionCart = createAsyncThunk(
  "/update/eductionCart",
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
export const DeleteEductionNiSkill = createAsyncThunk(
  "/update/banner",
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
export const UpdateEductionNiSkill = createAsyncThunk(
  "/update/banner",
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
export const DeleteEductionCart = createAsyncThunk(
  "/update/banner",
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
    const response = await axiosInstance.get("/");
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
export const getPassword = createAsyncThunk("/get/feedback", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
