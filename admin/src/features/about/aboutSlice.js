import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

// Async thunks
export const fetchAbout = createAsyncThunk("about/fetchAbout", async () => {
  try {
    const response = await api.get("/app/user/v3/Data/about");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data?.message || "Failed to fetch about data";
  }
});

export const updateAbout = createAsyncThunk(
  "about/updateAbout",
  async (aboutData, { rejectWithValue }) => {
    try {
      const response = await api.put("/app/admin/v3/About", aboutData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update about data"
      );
    }
  }
);

export const addJourneyItem = createAsyncThunk(
  "about/addJourneyItem",
  async (journeyItem, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/app/admin/v3/About/journey",
        journeyItem
      );
      response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add journey item"
      );
    }
  }
);

export const updateJourneyItem = createAsyncThunk(
  "about/updateJourneyItem",
  async ({ id, journeyItem }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/app/admin/v3/About/journey/${id}`,
        journeyItem
      );
      response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update journey item"
      );
    }
  }
);

export const deleteJourneyItem = createAsyncThunk(
  "about/deleteJourneyItem",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/app/admin/v3/About/journey/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete journey item"
      );
    }
  }
);

export const addFunFact = createAsyncThunk(
  "about/addFunFact",
  async (funFact, { rejectWithValue }) => {
    try {
      const response = await api.post("/app/admin/v3/About/funfact", funFact);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add fun fact"
      );
    }
  }
);

export const updateFunFact = createAsyncThunk(
  "about/updateFunFact",
  async ({ id, funFact }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/app/admin/v3/About/funfact/${id}`,
        funFact
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update fun fact"
      );
    }
  }
);

export const deleteFunFact = createAsyncThunk(
  "about/deleteFunFact",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/app/admin/v3/About/funfact/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete fun fact"
      );
    }
  }
);

const initialState = {
  aboutData: {
    title: "",
    description: "",
    BannerAboutImage: "",
    AboutPageImage: "",
    myJourney: [],
    funFact: [],
  },
  isLoading: false,
  error: null,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch about
      .addCase(fetchAbout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.aboutData = action.payload?.aboutData;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update about
      .addCase(updateAbout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.isLoading = false;

        state.aboutData = action.payload?.aboutData;
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Journey items
      .addCase(addJourneyItem.fulfilled, (state, action) => {
        state.aboutData.myJourney.push(action.payload?.myJourney);
      })
      .addCase(updateJourneyItem.fulfilled, (state, action) => {
        const index = state.aboutData.myJourney.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.aboutData.myJourney[index] = action.payload;
        }
      })
      .addCase(deleteJourneyItem.fulfilled, (state, action) => {
        state.aboutData.myJourney = state.aboutData.myJourney.filter(
          (item) => item._id !== action.payload
        );
      })
      // Fun facts
      .addCase(addFunFact.fulfilled, (state, action) => {
        state.aboutData.funFact.push(action.payload);
      })
      .addCase(updateFunFact.fulfilled, (state, action) => {
        const index = state.aboutData.funFact.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.aboutData.funFact[index] = action.payload;
        }
      })
      .addCase(deleteFunFact.fulfilled, (state, action) => {
        state.aboutData.funFact = state.aboutData.funFact.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearError } = aboutSlice.actions;
export default aboutSlice.reducer;
