import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  keywords: null,
  loading:false,
  error:null,
  alert:null,
}

export const eventSlice = createSlice({
  name: 'networkInterest',
  initialState,
  reducers: {
    getInterestKeywordsData : (state) => {
      state.loading = true
    },
    setInterestKeywordsData: (state, { payload}) => {
        state.keywords= payload,
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
export const { getInterestKeywordsData, setInterestKeywordsData, setError, setAlert } = eventSlice.actions

export const interestSelector = state => state.networkInterest

export default eventSlice.reducer

export const fetchKeywordsData = (url) => {
    return async dispatch => {
      dispatch(getInterestKeywordsData())
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/network-interest/45756`)
        const res = await response.json()
        dispatch(setInterestKeywordsData(res.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }
export const updateKeywordData = (url, data) => {
    return async dispatch => {
      dispatch(getInterestKeywordsData())
      try {
        const response = await axios.put(`${process.env.REACT_APP_URL}/event/${url}/update-network-interest/45756`, {keywords:data})
        dispatch(setAlert(response.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }