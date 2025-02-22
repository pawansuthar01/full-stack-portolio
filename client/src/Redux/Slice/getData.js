import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";
const initialState = {
  SocialLinkData:
    localStorage.getItem("SocialLinkData") == undefined
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
  eductionData:
    localStorage.getItem("eductionData") == undefined
      ? JSON.parse(localStorage.getItem("eductionData"))
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
    const response = await axiosInstance.get("/");
    return {
      SocialLinkData: response.data.linkData,
      bannerData: response.data.bannerData,
      aboutData: response.data.aboutData,
      projectData: response.data.aboutData,
      eductionData: response.data.aboutData,
      skillsData: response.data.aboutData,
      feedbackData: response.data.aboutData,
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
          JSON.stringify(action?.payload?.data?.linkData)
        );
        localStorage.setItem(
          "bannerData",
          JSON.stringify(action?.payload?.data?.bannerData)
        );
        localStorage.setItem(
          "projectData",
          JSON.stringify(action?.payload?.data?.projectData)
        );
        localStorage.setItem(
          "feedbackData",
          JSON.stringify(action?.payload?.data?.feedbackData)
        );
        localStorage.setItem(
          "skillsData",
          JSON.stringify(action?.payload?.data?.skillsData)
        );
        localStorage.setItem(
          "aboutData",
          JSON.stringify(action?.payload?.data?.aboutData)
        );
        state.SocialLinkData = action?.payload?.data?.linkData;
        state.bannerData = action?.payload?.data?.bannerData;
        state.feedbackData = action?.payload?.data?.feedbackData;
        state.skillsData = action?.payload?.data?.skillsData;
        state.aboutData = action?.payload?.data?.aboutData;
        state.projectData = action?.payload?.data?.projectData;
      }
    });
  },
});

export const {} = DataRedux.actions;
export default DataRedux.reducer;
