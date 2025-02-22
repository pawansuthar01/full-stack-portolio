import { createAsyncThunk } from "@reduxjs/toolkit";
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
