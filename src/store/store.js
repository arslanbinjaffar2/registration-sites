import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import eventReducer from "./Slices/EventSlice";
import globalReducer from "./Slices/GlobalSlice";
import speakerReducer from "./Slices/SpeakerSlice";
import attendeeReducer from "./Slices/AttendeeSlice";
import attendeeDetailReducer from "./Slices/AttendeeDetailSlice";
import speakerDetailReducer from "./Slices/SpeakerDetailSlice";
import mapReducer from "./Slices/MapSlice";
import newsDetailReducer from "./Slices/NewsDetailSlice";
import newsReducer from "./Slices/NewsSlice";
import profileReducer from "./Slices/myAccount/profileSlice";
import interestReducer from "./Slices/myAccount/networkInterestSlice";
import newsletterReducer from "./Slices/myAccount/newsletterSlice";
import subRegistrationReducer from "./Slices/myAccount/subRegistrationSlice";
import { sponsorApi } from "./services/sponsor";
import { exhibitorApi } from "./services/exhibitor";
import { programApi } from "./services/program";
import { photoApi } from "./services/photo";
import { cmsPageApi } from "./services/cmspage";
import { newsApi } from "./services/news";
import { videoApi } from "./services/video";
export const store = configureStore({
  reducer: {
    event: eventReducer,
    global: globalReducer,
    speaker: speakerReducer,
    attendee: attendeeReducer,
    attendeeDetail: attendeeDetailReducer,
    speakerDetail: speakerDetailReducer,
    map: mapReducer,
    newsDetail: newsDetailReducer,
    news: newsReducer,
    profile: profileReducer,
    networkInterest: interestReducer,
    newsletter: newsletterReducer,
    subRegistration: subRegistrationReducer,
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    [exhibitorApi.reducerPath]: exhibitorApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer,
    [cmsPageApi.reducerPath]: cmsPageApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      programApi.middleware,
      exhibitorApi.middleware,
      sponsorApi.middleware,
      cmsPageApi.middleware,
      photoApi.middleware,
      newsApi.middleware,
      videoApi.middleware
    ),
});
setupListeners(store.dispatch);
