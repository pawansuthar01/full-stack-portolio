import { useEffect } from "react";
import axios from "axios";
import axiosInstance from "../Helper/axiosInstance";

async function getUserDetails() {
  return;
  try {
    const deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
    };

    const ipData = await axios.get("https://ipapi.co/json/");

    const userData = {
      ip: ipData.data.ip,
      org: ipData.data.org,
      city: ipData.data.city,
      region: ipData.data.region,
      country: ipData.data.country_name,
      latitude: ipData.data.latitude,
      longitude: ipData.data.longitude,
      deviceInfo,
      timestamp: new Date().toISOString(),
    };

    await axiosInstance.post("/app/user/v3/Data/data", userData);
  } catch (error) {
    return null;
  }
}

// ✅ Runs only on mount

export default getUserDetails;
