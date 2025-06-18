import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";

// Define storage keys
const storageKeys = [
  "SocialLinkData",
  "bannerData",
  "aboutData",
  "projectData",

  "skillsData",
  "feedbackData",
];

// Define cache control
const LAST_FETCH_KEY = "lastDataFetchTime";
const FETCH_INTERVAL = 5 * 60 * 1000; // 5 mit.

// Function to get stored data from localStorage
const getStoredData = (key) => {
  try {
    const startTime = performance.now();
    const data = localStorage.getItem(key);
    const endTime = performance.now();

    console.log(
      `${key} loaded from localStorage in ${(endTime - startTime).toFixed(2)}ms`
    );

    return data && data !== "undefined" && data !== "null"
      ? JSON.parse(data)
      : [];
  } catch (error) {
    console.error(`❌ Error parsing localStorage data for ${key}:`, error);
    return [];
  }
};

// Initial Redux state from localStorage
const initialState = Object.fromEntries(
  storageKeys.map((key) => [key, getStoredData(key) || []])
);

// Thunk: Get all data (only if 24h has passed)
export const getAllData = createAsyncThunk(
  "/Get/All/Data",
  async (_, { getState }) => {
    const lastFetchTime = localStorage.getItem(LAST_FETCH_KEY);
    const now = Date.now();

    if (lastFetchTime && now - parseInt(lastFetchTime, 10) < FETCH_INTERVAL) {
      console.log("⏳ Using cached data. No new fetch needed.");
      return { success: false, message: "Using cached data" };
    }

    const startTime = performance.now();

    try {
      const responses = await Promise.all(
        storageKeys.map((key) =>
          axiosInstance.get(
            `/app/user/v3/Data/${key.replace("Data", "").toLowerCase()}`
          )
        )
      );

      const endTime = performance.now();
      console.log(
        `✅ API Data fetched in ${(endTime - startTime).toFixed(2)}ms`
      );

      const data = Object.fromEntries(
        storageKeys.map((key, index) => [
          key,
          responses[index]?.data?.data || [],
        ])
      );

      // Save timestamp
      localStorage.setItem(LAST_FETCH_KEY, now.toString());

      return { success: true, ...data };
    } catch (error) {
      console.error("❌ API Fetch Error:", error);
      return {
        success: false,
        error: error?.message || "Something went wrong...",
      };
    }
  }
);

// Redux Slice
const DataRedux = createSlice({
  name: "DataStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      if (action.payload.success) {
        storageKeys.forEach((key) => {
          if (Array.isArray(action.payload[key])) {
            localStorage.setItem(
              key,
              JSON.stringify(action.payload[key] || [])
            );
            state[key] = action.payload[key] || [];
          }
        });
      } else {
        console.warn("⚠ No new data fetched. Redux state unchanged.");
      }
    });
  },
});

export default DataRedux.reducer;
