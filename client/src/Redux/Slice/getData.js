import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";
const initialState = {
  SocialLinkData:
    localStorage.getItem("SocialLinkData") == null
      ? JSON.parse(localStorage.getItem("SocialLinkData"))
      : {},
  bannerData:
    localStorage.getItem("bannerData") == undefined
      ? JSON.parse(localStorage.getItem("bannerData"))
      : {},

  aboutData:
    localStorage.getItem("aboutData") == undefined
      ? JSON.parse(localStorage.getItem("aboutData"))
      : {},
  projectData:
    localStorage.getItem("projectData") == undefined
      ? JSON.parse(localStorage.getItem("projectData"))
      : {},
  educationData:
    localStorage.getItem("educationData") == undefined
      ? JSON.parse(localStorage.getItem("educationData"))
      : {},
  skillsData:
    localStorage.getItem("skillsData") == undefined
      ? JSON.parse(localStorage.getItem("skillsData"))
      : {},
  feedbackData:
    localStorage.getItem("feedbackData") == undefined
      ? JSON.parse(localStorage.getItem("feedbackData"))
      : {},
};

export const getAllData = createAsyncThunk("/Get/All/Data", async () => {
  try {
    const response = await axiosInstance.get("/app/user/v3/data");

    return {
      SocialLinkData: response.data.data.SocialLinkData,
      bannerData: response.data.data.bannerData,
      aboutData: response.data.data.aboutData,
      projectData: response.data.data.projectData,
      eductionData: response.data.data.eductionData,
      skillsData: response.data.data.skillsData,
      feedbackData: response.data.data.feedbackData,
      message: response.data.message,
      success: response.data.success,
    };
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});

const DataRedux = createSlice({
  name: "DataStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      if (action?.payload?.success) {
        localStorage.setItem(
          "SocialLinkData",
          JSON.stringify(action?.payload?.SocialLinkData)
        );
        localStorage.setItem(
          "bannerData",
          JSON.stringify(action?.payload?.bannerData)
        );
        localStorage.setItem(
          "educationData",
          JSON.stringify(action?.payload?.educationData)
        );
        localStorage.setItem(
          "projectData",
          JSON.stringify(action?.payload?.projectData)
        );
        localStorage.setItem(
          "feedbackData",
          JSON.stringify(action?.payload?.feedbackData)
        );
        localStorage.setItem(
          "skillsData",
          JSON.stringify(action?.payload?.skillsData)
        );
        localStorage.setItem(
          "aboutData",
          JSON.stringify(action?.payload?.aboutData)
        );
        state.SocialLinkData = action?.payload?.SocialLinkData;
        state.bannerData = action?.payload?.bannerData;
        state.feedbackData = action?.payload?.feedbackData;
        state.educationData = action?.payload?.eductionData;
        state.skillsData = action?.payload?.skillsData;
        state.aboutData = action?.payload?.aboutData;
        state.projectData = action?.payload?.projectData;
      }
    });
  },
});

export const {} = DataRedux.actions;
export default DataRedux.reducer;
