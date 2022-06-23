import { createSlice } from '@reduxjs/toolkit'
// import { setLoadCount } from './GlobalSlice'
const initialState = {
  event: null,
  loading: false,
  error: null,
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getEvent: (state) => {
      state.loading = true
    },
    setEvent: (state, { payload }) => {
      state.event = payload
      state.loading = false
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getEvent, setEvent, setError } = eventSlice.actions

export const eventSelector = state => state.event

export default eventSlice.reducer

export const fetchEvent = (url) => {
  return async dispatch => {
    dispatch(getEvent())
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}`)
      const res = await response.json()
      // const count = res.data.eventsiteSections.filter((i)=> i.status === 1).length;
      // dispatch(setLoadCount(count))
      dispatch(setEvent(res.data))
    } catch (error) {
      dispatch(setError())
    }
  }
}