import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";

const storageKeys = [
  "SocialLinkData",
  "bannerData",
  "aboutData",
  "projectData",
  "educationData",
  "skillsData",
  "feedbackData",
];

const getStoredData = (key) => {
  try {
    const startTime = performance.now();

    const data = localStorage.getItem(key);
    const endTime = performance.now();
    console.log(
      `${key} loaded from localStorage in ${(endTime - startTime).toFixed(2)}ms`
    );
    return data && data !== "undefined" ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

// Initial Redux State
const initialState = Object.fromEntries(
  storageKeys.map((key) => [key, getStoredData(key) || []])
);

export const getAllData = createAsyncThunk(
  "/Get/All/Data",
  async (_, { getState }) => {
    const startTime = performance.now();
    const state = getState().DataStore;

    if (storageKeys.every((key) => state[key].length)) {
      return { success: false };
    }

    try {
      const responses = await Promise.all(
        storageKeys.map((key) =>
          axiosInstance.get(
            `/app/user/v3/Data/${key.replace("Data", "").toLowerCase()}`
          )
        )
      );
      const endTime = performance.now();
      console.log(`API Data fetched in ${(endTime - startTime).toFixed(2)}ms`);
      const data = Object.fromEntries(
        storageKeys.map((key, index) => {
          const responseData = responses[index].data;
          return [key, responseData.data || []];
        })
      );

      return { success: true, ...data };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        success: false,
        error: error?.message || "Something went wrong...",
      };
    }
  }
);

const DataRedux = createSlice({
  name: "DataStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      if (action.payload.success) {
        storageKeys.forEach((key) => {
          if (Array.isArray(action.payload[key])) {
            localStorage.setItem(key, JSON.stringify(action.payload[key]));
            state[key] = action.payload[key];
          }
        });
      } else {
        console.warn("⚠ No new data fetched. Redux state unchanged.");
      }
    });
  },
});

export default DataRedux.reducer;
