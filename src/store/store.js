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
import mysubRegistrationReducer from "./Slices/myAccount/mysubRegistrationSlice";
import surveyListReducer from "./Slices/myAccount/surveyListSlice";
import surveyReducer from "./Slices/myAccount/surveySlice";
import userReducer from "./Slices/myAccount/userSlice";
import sponsorReducer from "./Slices/SponsorSlice";
import exhibitorReducer from "./Slices/ExhibitorSlice";
import sponsorListingReducer from "./Slices/SponsorListingSlice";
import exhibitorListingReducer from "./Slices/ExhibitorListingSlice";
import sponsorDetailReducer from "./Slices/SponsorDetailSlice";
import exhibitorDetailReducer from "./Slices/ExhibitorDetailSlice";
import documentsReducer from "./Slices/DocumentsSlice";
import cmsDetailReducer from "./Slices/CmsDetailSlice";
import { programApi } from "./services/program";
import { attendeeProgramApi } from "./services/attendeePrograms";
import { photoApi } from "./services/photo";
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
    mysubRegistration: mysubRegistrationReducer,
    surveyList: surveyListReducer,
    survey: surveyReducer,
    user: userReducer,
    sponsor: sponsorReducer,
    exhibitor: exhibitorReducer,
    sponsorListing: sponsorListingReducer,
    exhibitorListing: exhibitorListingReducer,
    sponsorDetail: sponsorDetailReducer,
    exhibitorDetail: exhibitorDetailReducer,
    documents: documentsReducer,
    cmsDetail: cmsDetailReducer,
    [programApi.reducerPath]: programApi.reducer,
    [attendeeProgramApi.reducerPath]: attendeeProgramApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      programApi.middleware,
      attendeeProgramApi.middleware,
      photoApi.middleware,
      newsApi.middleware,
      videoApi.middleware
    ),
});
setupListeners(store.dispatch);
