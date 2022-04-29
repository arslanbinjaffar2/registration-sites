import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  subRegistration: null,
  loading:false,
  error:null,
  alert:null,
}

export const eventSlice = createSlice({
  name: 'subRegistration',
  initialState,
  reducers: {
    getSubRegistrationData : (state) => {
      state.loading = true
    },
    setSubRegistrationData: (state, { payload}) => {
        state.subRegistration = payload,
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
export const { getSubRegistrationData, setSubRegistrationData, setError, setAlert } = eventSlice.actions

export const subRegistrationSelector = state => state.subRegistration

export default eventSlice.reducer

export const fetchSubRegistrationData = (url) => {
    return async dispatch => {
      dispatch(getSubRegistrationData())
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/my-sub-registration/45756`)
        const res = await response.json()
        dispatch(setSubRegistrationData(res.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }
export const updateSubRegistrationData = (url, data) => {
    return async dispatch => {
      dispatch(getSubRegistrationData())
      try {
        console.log(data)
        const response = await axios.post(`${process.env.REACT_APP_URL}/event/${url}/save-sub-registration/45756`, data)
        dispatch(setAlert(response.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }