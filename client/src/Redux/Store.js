import { configureStore } from "@reduxjs/toolkit";
import DataRedux from "./Slice/getData";
import AdminRedux from "./Slice/Admin";
const Store = configureStore({
  reducer: {
    DataStore: DataRedux,
    AdminStore: AdminRedux,
  },
  devTools: true,
});
export default Store;
