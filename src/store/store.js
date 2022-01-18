import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import eventReducer from "./Slices/EventSlice";
import globalReducer from "./Slices/GlobalSlice";
import speakerReducer from "./Slices/SpeakerSlice";
import attendeeReducer from "./Slices/AttendeeSlice";
import attendeeDetailReducer from "./Slices/AttendeeDetailSlice";
import speakerDetailReducer from "./Slices/SpeakerDetailSlice";
import mapReducer from "./Slices/MapSlice";
import { sponsorApi } from "./services/sponsor";
import { exhibitorApi } from "./services/exhibitor";
import { programApi } from "./services/program";
import { photoApi } from "./services/photo";
import { cmsPageApi } from "./services/cmspage";
import { newsApi } from "./services/news";
export const store = configureStore({
  reducer: {
    event: eventReducer,
    global: globalReducer,
    speaker: speakerReducer,
    attendee: attendeeReducer,
    attendeeDetail: attendeeDetailReducer,
    speakerDetail: speakerDetailReducer,
    map: mapReducer,
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    [exhibitorApi.reducerPath]: exhibitorApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
    [cmsPageApi.reducerPath]: cmsPageApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      programApi.middleware,
      exhibitorApi.middleware,
      sponsorApi.middleware,
      cmsPageApi.middleware,
      photoApi.middleware,
      newsApi.middleware
    ),
});
setupListeners(store.dispatch);
