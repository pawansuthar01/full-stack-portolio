import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

// Async thunks
export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/app/user/v3/Data/skills");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch skills"
      );
    }
  }
);

export const createSkillModule = createAsyncThunk(
  "skills/createSkillModule",
  async (moduleData, { rejectWithValue }) => {
    try {
      const response = await api.post("/skills", moduleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create skill module"
      );
    }
  }
);

export const updateSkillModule = createAsyncThunk(
  "skills/updateSkillModule",
  async ({ id, moduleData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/skills/${id}`, moduleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update skill module"
      );
    }
  }
);

export const deleteSkillModule = createAsyncThunk(
  "skills/deleteSkillModule",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/skills/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete skill module"
      );
    }
  }
);

const initialState = {
  skillModules: [],
  isLoading: false,
  error: null,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch skills
      .addCase(fetchSkills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skillModules = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create skill module
      .addCase(createSkillModule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSkillModule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skillModules.push(action.payload);
      })
      .addCase(createSkillModule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update skill module
      .addCase(updateSkillModule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSkillModule.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.skillModules.findIndex(
          (module) => module._id === action.payload._id
        );
        if (index !== -1) {
          state.skillModules[index] = action.payload;
        }
      })
      .addCase(updateSkillModule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete skill module
      .addCase(deleteSkillModule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSkillModule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skillModules = state.skillModules.filter(
          (module) => module._id !== action.payload
        );
      })
      .addCase(deleteSkillModule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = skillsSlice.actions;
export default skillsSlice.reducer;
