import { configureStore } from '@reduxjs/toolkit'
import  eventReducer  from './Slices/EventSlice'
export const store = configureStore({
  reducer: {
    event:eventReducer
  },
})