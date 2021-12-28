import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import  eventReducer  from './Slices/EventSlice'
import { attendeeApi } from './services/attendee'
export const store = configureStore({
  reducer: {
    event:eventReducer,
    [attendeeApi.reducerPath]: attendeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(attendeeApi.middleware),
})
setupListeners(store.dispatch)