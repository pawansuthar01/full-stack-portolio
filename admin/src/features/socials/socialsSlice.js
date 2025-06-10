import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

// Async thunks
export const fetchSocials = createAsyncThunk(
  "socials/fetchSocials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/app/user/v3/Data/socials");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch social links"
      );
    }
  }
);

export const updateSocials = createAsyncThunk(
  "socials/updateSocials",
  async (socialsData, { rejectWithValue }) => {
    try {
      const response = await api.put("/socials", socialsData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update social links"
      );
    }
  }
);

const initialState = {
  socialLinks: {
    Instagram: "",
    LinkedIn: "",
    GitHub: "",
    X: "",
    CV: "",
  },
  isLoading: false,
  error: null,
};

const socialsSlice = createSlice({
  name: "socials",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch socials
      .addCase(fetchSocials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSocials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.socialLinks = action.payload;
      })
      .addCase(fetchSocials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update socials
      .addCase(updateSocials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSocials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.socialLinks = action.payload;
      })
      .addCase(updateSocials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = socialsSlice.actions;
export default socialsSlice.reducer;
