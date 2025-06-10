import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

// Check if token is expired
const isTokenExpired = (timestamp) => {
  if (!timestamp) return true;
  const expiryTime = new Date(timestamp).getTime();
  const currentTime = new Date().getTime();
  return currentTime > expiryTime;
};

// Async thunks

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/app/admin/v3/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/app/admin/v3/auth/verify-otp", {
        email,
        otp,
      });
      const { token, user } = response.data;

      // Set expiry to 24 hours from now
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 24);

      // Store in localStorage
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));
      localStorage.setItem("tokenExpiry", expiryTime.toISOString());

      return { token, user, tokenExpiry: expiryTime.toISOString() };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/app/admin/v3/auth/resend-otp", {
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  }
);

const initialState = {
  tokenExpiry: Number(localStorage.getItem("tokenExpiry")) || 0,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  otpSent: false,
  otpEmail: localStorage.getItem("otpEmail") || null,
  resendCooldown: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokenExpiry = null;
      state.isAuthenticated = false;
      state.otpSent = false;
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("otpEmail");
    },
    checkAuth: (state) => {
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (tokenExpiry && !isTokenExpired(tokenExpiry)) {
        state.tokenExpiry = tokenExpiry;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
        localStorage.removeItem("tokenExpiry");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    CheckEmail: (state) => {
      const otpEmail = localStorage.getItem("otpEmail");
      if (!otpEmail || otpEmail == null || otpEmail == "undefined") {
        localStorage.setItem("otpSend", false);
        state.otpSent = false;
      } else {
        localStorage.setItem("otpSend", true);
        state.otpSent = true;
      }
    },
    setResendCooldown: (state, action) => {
      state.resendCooldown = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        console.log(action);
        if (!action?.payload?.success) return;
        state.isLoading = false;
        state.otpSent = true;
        localStorage.setItem("otpEmail", action?.payload?.email);
        state.otpEmail = action?.payload?.email;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        localStorage.setItem("otpEmail", null);
        state.otpEmail = null;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", true);

        state.tokenExpiry = Number(action.payload.expiry);
        localStorage.setItem("tokenExpiry", Number(action.payload.expiry));
        state.otpSent = false;
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Resend OTP
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.resendCooldown = 60;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, checkAuth, clearError, CheckEmail, setResendCooldown } =
  authSlice.actions;
export default authSlice.reducer;
