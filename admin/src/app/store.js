import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import projectsReducer from "../features/projects/projectsSlice";
import bannerSlice from "../features/banner/BannerSlice";
import aboutReducer from "../features/about/aboutSlice";
import feedbackReducer from "../features/feedback/feedbackSlice";
import messagesReducer from "../features/messages/messagesSlice";
import skillsReducer from "../features/skills/skillsSlice";
import socialsReducer from "../features/socials/socialsSlice";
import subscriptionsReducer from "../features/subscriptions/subscriptionsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  banner: bannerSlice,
  about: aboutReducer,
  feedback: feedbackReducer,
  messages: messagesReducer,
  skills: skillsReducer,
  socials: socialsReducer,
  subscriptions: subscriptionsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
