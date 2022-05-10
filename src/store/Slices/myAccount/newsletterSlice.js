import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  newsletter: null,
  loading:false,
  error:null,
  alert:null,
}

export const eventSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {
    getNewsletterData : (state) => {
      state.loading = true
    },
    setNewsletterData: (state, { payload}) => {
        state.newsletter = payload,
        state.loading = false
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
    setAlert: (state, { payload }) => {
      state.alert = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getNewsletterData, setNewsletterData, setError, setAlert } = eventSlice.actions

export const newsLetterSelector = state => state.newsletter

export default eventSlice.reducer

export const fetchNewsletterData = (url) => {
    return async dispatch => {
      dispatch(getNewsletterData())
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/newsletter-subscription/45756`)
        const res = await response.json()
        dispatch(setNewsletterData(res.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }
export const updateNewsLetterData = (url, data) => {
    return async dispatch => {
      dispatch(getNewsletterData())
      try {
        const response = await axios.put(`${process.env.REACT_APP_URL}/event/${url}/update-newsletter-subscription/45756`, data)
        dispatch(setAlert(response.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }