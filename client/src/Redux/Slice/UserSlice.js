import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";
const initialState = {
  message: [],
};
export const Subscribe = createAsyncThunk("/post/Subscribe", async (email) => {
  try {
    const response = await axiosInstance.post(
      `/app/user/v3/Data/subscribe/${email}`
    );

    return response?.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const submitMessage = createAsyncThunk(
  "/submit/Message",
  async (data) => {
    try {
      const response = await axiosInstance.post("/app/user/v3/Message", data);

      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const submitFeedback = createAsyncThunk(
  "/submit/Feedback",
  async (data) => {
    try {
      const response = await axiosInstance.post("/app/user/v3/Feedback", data);

      return response?.data;
    } catch (error) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

const UserRedux = createSlice({
  name: "userRedux",
  initialState,
  reducers: [],
  extraReducers: "",
});
export const {} = UserRedux.actions;
export default UserRedux.reducer;
