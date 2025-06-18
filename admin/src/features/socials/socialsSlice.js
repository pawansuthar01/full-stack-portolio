import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

// Async thunks
export const fetchSocials = createAsyncThunk(
  "socials/fetchSocials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/app/user/v3/Data/sociallink");
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
      const response = await api.put("/app/admin/v3/social", socialsData);
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
        state.socialLinks.CV = action.payload?.data[0]?.CV;
        state.socialLinks.Instagram = action.payload?.data[0]?.Instagram;
        state.socialLinks.X = action.payload?.data[0]?.X;
        state.socialLinks.GitHub = action.payload?.data[0]?.GitHub;
        state.socialLinks.LinkedIn = action.payload?.data[0]?.LinkedIn;
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

        state.socialLinks.CV = action.payload?.data?.CV;
        state.socialLinks.Instagram = action.payload?.data?.Instagram;
        state.socialLinks.X = action.payload?.data?.X;
        state.socialLinks.GitHub = action.payload?.data?.GitHub;
        state.socialLinks.LinkedIn = action.payload?.data?.LinkedIn;
      })
      .addCase(updateSocials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = socialsSlice.actions;
export default socialsSlice.reducer;
