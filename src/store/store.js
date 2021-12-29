import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import  eventReducer  from './Slices/EventSlice'
import { attendeeApi } from './services/attendee'
import { speakerApi } from './services/speaker'
import { sponsorApi } from './services/sponsor'
import { exhibitorApi } from './services/exhibitor'
import { programApi } from './services/program'
export const store = configureStore({
  reducer: {
    event:eventReducer,
    [attendeeApi.reducerPath]: attendeeApi.reducer,
    [speakerApi.reducerPath]: speakerApi.reducer,
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    [exhibitorApi.reducerPath]: exhibitorApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(attendeeApi.middleware)
    .concat(programApi.middleware)
    .concat(exhibitorApi.middleware)
    .concat(sponsorApi.middleware)
    .concat(speakerApi.middleware),
})
setupListeners(store.dispatch)