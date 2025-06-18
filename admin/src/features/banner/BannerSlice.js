import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

// Async thunks
export const fetchBanner = createAsyncThunk("Banner/fetchAbout", async () => {
  try {
    const response = await api.get("/app/user/v3/Data/banner");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data?.message || "Failed to fetch banner data";
  }
});

export const updateBanner = createAsyncThunk(
  "about/updateAbout",
  async (bannerData, { rejectWithValue }) => {
    try {
      const response = await api.put("/app/admin/v3/banner", bannerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update about data"
      );
    }
  }
);

const initialState = {
  banner: {},
  isLoading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch about
      .addCase(fetchBanner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banner = action.payload?.data[0];
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update about
      .addCase(updateBanner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false;

        state.banner = action.payload?.data[0];
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = bannerSlice.actions;
export default bannerSlice.reducer;
