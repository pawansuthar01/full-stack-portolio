import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

// Async thunks
export const fetchFeedback = createAsyncThunk(
  "feedback/fetchFeedback",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/app/user/v3/Data/feedback");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch feedback"
      );
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/feedback/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete feedback"
      );
    }
  }
);

export const updateFeedbackStatus = createAsyncThunk(
  "feedback/updateFeedbackStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/feedback/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update feedback status"
      );
    }
  }
);

const initialState = {
  feedbackList: [],
  isLoading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch feedback
      .addCase(fetchFeedback.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedbackList = action.payload?.data;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete feedback
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbackList = state.feedbackList.filter(
          (item) => item._id !== action.payload?.data
        );
      })
      // Update feedback status
      .addCase(updateFeedbackStatus.fulfilled, (state, action) => {
        const index = state.feedbackList.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.feedbackList[index] = action.payload?.data;
        }
        x;
      });
  },
});

export const { clearError } = feedbackSlice.actions;
export default feedbackSlice.reducer;
