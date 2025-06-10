import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

// Async thunks
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/app/user/v3/Message");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);

export const toggleMessageRead = createAsyncThunk(
  "messages/toggleMessageRead",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/messages/${id}/toggle-read`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle message read status"
      );
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/messages/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete message"
      );
    }
  }
);

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Toggle message read
      .addCase(toggleMessageRead.fulfilled, (state, action) => {
        const index = state.messages.findIndex(
          (msg) => msg._id === action.payload._id
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      // Delete message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (msg) => msg._id !== action.payload
        );
      });
  },
});

export const { clearError } = messagesSlice.actions;
export default messagesSlice.reducer;
